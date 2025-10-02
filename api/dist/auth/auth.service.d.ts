import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BodyLogin, LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ReturnUserDto } from 'src/users/dto/return.dto';
import { SessionService } from 'src/sessions/sessions.service';
import { UserData } from 'src/sessions/entities/sessions.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly config;
    private readonly sessionsService;
    constructor(usersService: UsersService, jwtService: JwtService, config: ConfigService, sessionsService: SessionService);
    login(body: BodyLogin, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    signIn(email: string, password: string, request: Request): Promise<LoginDto | UnauthorizedException>;
    registration(body: BodyRegistration): Promise<RegistrationDto | ConflictException>;
    createAccessToken(user: ReturnUserDto, request: Request, user_data: UserData): Promise<string>;
    createRefreshToken(payload: any): Promise<string>;
    refresh(request: Request): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
