import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserPassDto } from './dto/return.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(public dataSource: DataSource) {}
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
  async findUser(email: string): Promise<ReturnUserPassDto> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
    console.log(user);
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
