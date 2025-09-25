import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserPassDto } from './dto/return.dto';
import { DataSource } from 'typeorm';
export declare class UsersService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    create(createUserDto: CreateUserDto): Promise<{
        message: any;
        statusCode: any;
    }>;
    findAll(): string;
    findOne(id: number): string;
    findUser(email: string): Promise<ReturnUserPassDto>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
