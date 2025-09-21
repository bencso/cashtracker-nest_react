import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserDto, ReturnUserPassDto } from './dto/return.dto';

@Injectable()
export class UsersService {
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      message: [
        `Email: ${createUserDto.email},Pwd: ${createUserDto.password},Uname: ${createUserDto.username}`,
      ],
      statusCode: 200,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  //TODO: Logikát majd ide beirni, csak utána kell nézni hogy müködik pontosan ezaz ORM
  async findUser(username: string): Promise<ReturnUserPassDto> {
    return {
      id: 1,
      username: 'KisJakab',
      password: 'Password',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
