import { Body, Controller, Get, Req } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { Request } from 'express';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionService: SessionService) { }

    @Get()
    getSessionByUserId(userId: Number, @Req() req: Request) {
        return this.sessionService.getSessionByUserId(userId, req);
    }
}
