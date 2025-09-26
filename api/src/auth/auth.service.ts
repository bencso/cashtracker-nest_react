import {
  Body,
  ConflictException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BodyLogin, LoginDto } from './dto/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(@Body() body: BodyLogin, @Res() response: Response) {
    try {
      const token = (await this.signIn(body.email, body.password)) as LoginDto;

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
        const payload = { id: user.id, username: user.username };
        const getAcessToken = this.jwtService.signAsync(payload, {
          expiresIn: this.config.get<string>('JWT_TOKEN_TIME'),
        } as JwtSignOptions);
        const getRefreshToken = this.jwtService.signAsync(
          { username: user.username },
          {
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get<string>('JWT_REFRESH_TIME'),
          } as JwtSignOptions,
        );

        const access = await getAcessToken;

        return {
          message: ['Sikeres bejelentkezés'],
          statusCode: 200,
          data: { access },
          tokens: {
            refresh: await getRefreshToken,
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

  async refresh(request: Request) {
    if (
      request &&
      request.headers &&
      request.headers['cookie'] &&
      String(request.headers['cookie']).includes('refreshToken=')
    ) {
      const refreshToken = String(request.headers['cookie'])
        .split('refreshToken=')[1]
        .split(';')[0];

      await this.jwtService
        .verifyAsync(refreshToken, {
          secret: this.config.get('JWT_REFRESH_SECRET'),
        })
        .then((value) => {
          console.log(value);
          // const payload = { id: user.id, username: user.username };

          // const getAcessToken = this.jwtService.signAsync(payload, {
          //   expiresIn: this.config.get<string>('JWT_TOKEN_TIME'),
          // } as JwtSignOptions);
        })
        .catch((err) => {
          return new ConflictException(err);
        });
      return {
        message: refreshToken,
      };
    } else
      throw new UnauthorizedException({
        message: 'Érvénytelen bejelentkezési adat(ok)',
        status: 401,
      });
  }
}
