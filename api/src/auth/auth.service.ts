import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { Logger, LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<LoginDto | UnauthorizedException> {
    try {
      const user = await this.usersService.findUser(email);
      if (password != user.password)
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401,
        });

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
    } catch (err) {
      return {
        message: [err.message],
        statusCode: err.status,
      };
    }
  }

  //TODO: Regisztráció implementálása
  async registration(
    body: BodyRegistration,
  ): Promise<RegistrationDto | ConflictException> {
    return {
      message: ['Sikeres regisztrációs!'],
      statusCode: 201,
      data: {},
    };
  }
}
