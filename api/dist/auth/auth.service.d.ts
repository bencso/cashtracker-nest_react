import { UsersController } from 'src/users/users.controller';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersController);
    singIn(username: string, password: string): Promise<LoginDto>;
}
