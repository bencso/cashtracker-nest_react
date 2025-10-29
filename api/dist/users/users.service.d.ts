import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
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
    findOne(id: number): Promise<User>;
    updatePassword({ password, userId, }: {
        password: string;
        userId: number;
    }): Promise<{
        message: any[];
        statusCode: any;
    }>;
    findUser(email: string): Promise<ReturnUserPassDto>;
    update(id: number): string;
    remove(id: number): string;
}
