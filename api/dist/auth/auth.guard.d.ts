import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/sessions/sessions.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private config;
    private readonly sessionService;
    constructor(jwtService: JwtService, config: ConfigService, sessionService: SessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
