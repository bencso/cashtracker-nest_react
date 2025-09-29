import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
import { BodyRegistration } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    login(body: BodyLogin, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    registration(body: BodyRegistration): Promise<import("./dto/registration.dto").RegistrationDto | import("@nestjs/common").ConflictException>;
    refreshToken(request: Request): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
