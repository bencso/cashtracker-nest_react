import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(username: string, password: string): Promise<LoginDto> {
    return {
      message: ['Successful login'],
      statusCode: 200,
      data: {
        username,
      },
    };
  }
}
