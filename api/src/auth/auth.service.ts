import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<LoginDto | UnauthorizedException> {
    const user = await this.usersService.findUser(username);
    if (password != user.password)
      throw new UnauthorizedException({
        message: 'Érvénytelen bejelentkezési adat(ok)',
      });
    const payload = { id: user.id, username: user.username };
    const jwt = this.jwtService.signAsync(payload);

    return {
      message: ['Sikeres bejelentkezés'],
      statusCode: 200,
      data: { jwt: await jwt },
    };
  }
}
