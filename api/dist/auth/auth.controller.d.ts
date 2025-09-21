import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: BodyLogin): Promise<import("./dto/login.dto").LoginDto | import("@nestjs/common").UnauthorizedException>;
}
