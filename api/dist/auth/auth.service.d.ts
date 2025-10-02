import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BodyLogin, LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ReturnUserDto } from 'src/users/dto/return.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly config;
    constructor(usersService: UsersService, jwtService: JwtService, config: ConfigService);
    login(body: BodyLogin, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    signIn(email: string, password: string, request: Request): Promise<LoginDto | UnauthorizedException>;
    registration(body: BodyRegistration): Promise<RegistrationDto | ConflictException>;
    createAccessToken(user: ReturnUserDto, request: Request): Promise<string>;
    createRefreshToken(user: ReturnUserDto): Promise<string>;
    refresh(request: Request): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
