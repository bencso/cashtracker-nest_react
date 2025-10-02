import { Injectable, Req } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Sessions } from './entities/sessions.entity';
import { Request } from 'express';

@Injectable()
export class SessionService {
    constructor(public dataSource: DataSource) { }
    async sessionsIsValid(userId: Number, @Req() req: Request) {
        const dbData = await this.dataSource
            .getRepository(Sessions)
            .createQueryBuilder('sessions')
            .where('sessions.userId = :userId', { userId: userId })
            .getOne();

        const requestUser = {
            user_agent: req.headers['user-agent'],
            ip: req.ip
        };

        const validUser = dbData.user_data === requestUser;
        console.log(validUser);
        console.log(req?.cookies?.refreshToken);
    }
}
