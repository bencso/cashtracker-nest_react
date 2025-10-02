import { Module } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [ConfigModule, UsersModule],
    controllers: [SessionsController],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule { }
