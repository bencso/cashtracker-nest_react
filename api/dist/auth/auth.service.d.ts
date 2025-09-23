import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BodyRegistration, RegistrationDto } from './dto/registration.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<LoginDto | UnauthorizedException>;
    registration(body: BodyRegistration): Promise<RegistrationDto | ConflictException>;
}
