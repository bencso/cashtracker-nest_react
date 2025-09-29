import {
  Body,
  ConflictException,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BodyLogin, LoginDto } from './dto/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ReturnUserDto } from 'src/users/dto/return.dto';

/*
 * TODO: Majd iP-t is lehet nézni, nem csak user-agent (ugyanugy lehet hamisitani meg minden...,
 * csak az a baj hogy user-agenttel is hogy ha már más gépen használja kilőve a token és ujra jelentkezhet be)
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(
    @Body() body: BodyLogin,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const token = (await this.signIn(
        body.email,
        body.password,
        request,
      )) as LoginDto;

      if (token.tokens) {
        response.cookie('accessToken', token.tokens.access, {
          maxAge: +this.config.get<string>('JWT_TOKEN_TIME'),
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return response.json({ token: token.tokens.refresh });
      } else {
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401,
        });
      }
    } catch (error) {
      throw new ConflictException({
        message: [error.message],
        statusCode: error.status,
      });
    }
  }

  async signIn(
    email: string,
    password: string,
    request: Request,
  ): Promise<LoginDto | UnauthorizedException> {
    try {
      const user = await this.usersService.findUser(email);
      const compared = await bcrypt.compare(password, user.password);
      if (!compared) {
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401,
        });
      } else {
        const getAcessToken = await this.createAccessToken(user);
        const getRefreshToken = await this.createRefreshToken(user, request);

        const access = await getAcessToken;

        return {
          message: ['Sikeres bejelentkezés'],
          statusCode: 200,
          data: { access },
          tokens: {
            refresh: getRefreshToken,
            access,
          },
        };
      }
    } catch (err) {
      return {
        message: [err.message],
        statusCode: err.status,
      };
    }
  }

  async registration(
    body: BodyRegistration,
  ): Promise<RegistrationDto | ConflictException> {
    const salt = 10;
    try {
      const hashedPassword = await bcrypt.hash(body.password, salt);
      await this.usersService
        .create({
          email: body.email,
          username: body.username,
          password: hashedPassword,
        })
        .then((value) => {
          if (value.statusCode !== 200)
            if (String(value.message).includes('ER_DUP_ENTRY')) {
              throw new ConflictException(
                'Ez az email cím már regisztrálva van!',
              );
            } else {
              throw new ConflictException(value);
            }
        })
        .catch((error) => {
          throw new ConflictException(error);
        });

      return {
        message: ['Sikeres regisztrációs!'],
        statusCode: 200,
        data: {},
      };
    } catch (err) {
      return {
        message: [err.message],
        statusCode: err.status,
      };
    }
  }

  async createAccessToken(user: ReturnUserDto) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.get<string>('JWT_TOKEN_TIME'),
    } as JwtSignOptions);
  }

  async createRefreshToken(user: ReturnUserDto, request: Request) {
    return this.jwtService.signAsync(
      {
        email: user.email,
        useragent: request.headers['user-agent'],
      },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_TIME'),
      } as JwtSignOptions,
    );
  }

  async refresh(request: Request) {
    if (
      request &&
      request.headers &&
      request?.headers?.cookie &&
      request?.cookies?.refreshToken
    ) {
      const refreshToken = request?.cookies?.refreshToken;
      try {
        const verifiedToken = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        });
        if (verifiedToken.useragent !== request.headers['user-agent']) {
          throw new UnauthorizedException('Érvénytelen bejelentkezési token');
        }

        const newRefreshToken = await this.createRefreshToken(
          { email: verifiedToken.email } as ReturnUserDto,
          request,
        );

        const user = await this.usersService.findUser(verifiedToken.email);

        const newAccessToken = await this.createAccessToken({
          email: verifiedToken.email,
          id: user.id,
        } as ReturnUserDto);

        return { refreshToken: newRefreshToken, accessToken: newAccessToken };
      } catch (error) {
        throw new UnauthorizedException(
          'Érvénytelen vagy lejárt refresh token: ' + error,
        );
      }
    } else
      throw new UnauthorizedException({
        message: 'Érvénytelen bejelentkezési adat(ok)',
        status: 401,
      });
  }
}
