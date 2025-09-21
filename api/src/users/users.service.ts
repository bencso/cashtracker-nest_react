import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnDto } from 'src/dto/return.dto';

@Injectable()
export class UsersService {
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnDto> {
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
