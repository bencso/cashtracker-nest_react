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
    email: string,
    password: string,
  ): Promise<LoginDto | UnauthorizedException> {
    const user = await this.usersService.findUser(email);
    if (password != user.password)
      throw new UnauthorizedException({
        message: 'Érvénytelen bejelentkezési adat(ok)',
      });
    //TODO: Majd a TODO.md-ben leírt 6-10. sorig leirtak megvalósítása
    const payload = { id: user.id, username: user.username };
    const jwt = this.jwtService.signAsync(payload);

    return {
      message: ['Sikeres bejelentkezés'],
      statusCode: 200,
      data: { jwt: await jwt },
    };
  }
}
