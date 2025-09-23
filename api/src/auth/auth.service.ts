import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { Logger, LoggerModule } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(
    email: string,
    password: string,
  ): Promise<LoginDto | UnauthorizedException> {
    try {
      const user = await this.usersService.findUser(email);
      if (password != user.password)
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401
        });

      const payload = { id: user.id, username: user.username };
      const getToken = this.jwtService.signAsync(payload);

      return {
        message: ['Sikeres bejelentkezés'],
        statusCode: 200,
        data: { jwt: await getToken },
      };
    } catch (err) {
      return {
        message: [err.message],
        statusCode: err.status,
      }
    }
  }

  async registration(body: BodyRegistration): Promise<RegistrationDto | ConflictException> {

    return {
      message: ['Sikeres regisztrációs!'],
      statusCode: 201,
      data: {}
    }
  }
}
