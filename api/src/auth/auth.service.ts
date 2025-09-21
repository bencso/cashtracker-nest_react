import { Injectable } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersController) {}

  async singIn(username: string, password: string): Promise<LoginDto> {
    return {
      message: 'Sucessfull',
      statusCode: 200,
      data: {
        username,
      },
    };
  }
}