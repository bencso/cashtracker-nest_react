import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signIn(username: string, password: string): Promise<LoginDto>;
}
