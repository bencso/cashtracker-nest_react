import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserPassDto } from './dto/return.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(public dataSource: DataSource) { }
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

  async findOne(id: number) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  async updatePassword({ password, userId }: { password: string; userId: number }) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(User)
        .set([
          {
            password: password,
          },
        ])
        .where("user = :id", { id: userId })
        .execute();
      return {
        message: [`Sikeres jelszóváltoztatás!`],
        statusCode: 200,
      };
    } catch (err) {
      return {
        message: err.message,
        statusCode: err.statusCode,
      };
    }
  }

  async findUser(email: string): Promise<ReturnUserPassDto> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
    return {
      id: user.id,
      email: user.email,
      username: user.username,
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
