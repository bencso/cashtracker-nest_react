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
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email: createUserDto.email,
            password: createUserDto.password,
            username: createUserDto.username,
          },
        ])
        .execute();
      return {
        message: [`Sikeres regisztráció!`],
        statusCode: 200,
      };
    } catch (err) {
      return {
        message: err.message,
        statusCode: err.statusCode,
      };
    }
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
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
