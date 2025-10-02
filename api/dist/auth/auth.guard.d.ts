import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionService } from 'src/sessions/sessions.service';
export declare class AuthGuard implements CanActivate {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
