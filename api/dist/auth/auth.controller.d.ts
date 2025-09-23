import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
import { BodyRegistration } from './dto/registration.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: BodyLogin): Promise<import("./dto/login.dto").LoginDto | import("@nestjs/common").UnauthorizedException>;
    registration(body: BodyRegistration): Promise<import("./dto/registration.dto").RegistrationDto | import("@nestjs/common").ConflictException>;
}
