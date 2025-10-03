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
import { randomUUID } from 'crypto';
import { SessionService } from 'src/sessions/sessions.service';
import { UserData } from 'src/sessions/entities/sessions.entity';
import { User } from 'src/users/entities/user.entity';
import { ReturnDataDto } from 'src/dto/return.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly sessionsService: SessionService,
  ) {}

  async login(
    @Body() body: BodyLogin,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<ReturnDataDto | UnauthorizedException> {
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

        return {
          message: token.message,
          statusCode: token.statusCode || 404,
          data: token.data || null,
        };
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
      const user = (await this.usersService.findUser(email)) as User;
      const compared = await bcrypt.compare(password, user.password);
      if (!compared) {
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401,
        });
      } else {
        const tokens = await this.createTokens(user, request);

        return {
          message: ['Sikeres bejelentkezés'],
          statusCode: 200,
          data: { access: tokens.access },
          tokens: {
            refresh: tokens.refresh,
            access: tokens.access,
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

  async refresh(request: Request): Promise<object | UnauthorizedException> {
    if (request && request.headers && request?.headers.authorization) {
      const refreshToken = request?.headers.authorization.split('Bearer ')[1];
      try {
        const verifiedToken = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        });

        const user = await this.usersService.findOne(verifiedToken.sub);

        if (!this.sessionsService.sessionsIsValid(request))
          throw new UnauthorizedException('Érvénytelen bejelentkezési adatok');

        const tokens = await this.createTokens(user, request);
        return { refreshToken: tokens.refresh, accessToken: tokens.access };
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

  async createAccessToken(user: ReturnUserDto, user_data: UserData) {
    const payload = {
      email: user.email,
      user_data: user_data,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.config.get<string>('JWT_TOKEN_TIME'),
    } as JwtSignOptions);
  }

  async createRefreshToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_TIME'),
    } as JwtSignOptions);
  }

  async createTokens(user: User, request: Request) {
    const payload = {
      sub: user.id,
      tokenId: randomUUID(),
    };

    const user_data = {
      ip: request.ip,
      user_agent: request.headers['user-agent'],
    } as UserData;

    const accessToken = await this.createAccessToken(user, user_data);
    await this.sessionsService.createSessionInDb(
      payload.sub,
      accessToken,
      user_data,
      payload.tokenId,
    );

    return {
      refresh: await this.createRefreshToken(payload),
      access: accessToken,
    };
  }
}
