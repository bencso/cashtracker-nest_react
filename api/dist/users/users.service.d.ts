import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnDto } from 'src/dto/return.dto';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<ReturnDto>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
