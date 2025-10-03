import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
import { BodyRegistration } from './dto/registration.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: BodyLogin, request: Request, response: Response): Promise<import("@nestjs/common").UnauthorizedException | Response<import("../dto/return.dto").ReturnDataDto, Record<string, any>>>;
    registration(body: BodyRegistration): Promise<import("@nestjs/common").ConflictException | import("./dto/registration.dto").RegistrationDto>;
    refreshToken(request: Request): Promise<object | import("@nestjs/common").UnauthorizedException>;
}
