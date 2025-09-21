import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserPassDto } from './dto/return.dto';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<{
        message: string[];
        statusCode: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    findUser(username: string): Promise<ReturnUserPassDto>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
