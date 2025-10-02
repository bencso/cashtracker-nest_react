import { DataSource } from 'typeorm';
import { UserData } from './entities/sessions.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
export declare class SessionService {
    private dataSource;
    private jwtService;
    private config;
    private userService;
    constructor(dataSource: DataSource, jwtService: JwtService, config: ConfigService, userService: UsersService);
    sessionsIsValid(req: Request): Promise<void>;
    createSessionInDb(sub: number, token: string, user_data: UserData, sessionId: string): Promise<void>;
}
