import { Controller, Get } from '@nestjs/common';
import { SessionService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionService: SessionService) { }

    @Get()
    getSessionByUserId(userId: Number){
        
    }
}
