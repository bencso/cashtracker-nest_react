import { SessionService } from './sessions.service';
import { Request } from 'express';
export declare class SessionsController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    getSessionByUserId(userId: Number, req: Request): Promise<void>;
}
