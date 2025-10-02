import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule } from 'src/sessions/sessions.module';
import { SessionService } from 'src/sessions/sessions.service';
@Module({
  imports: [UsersModule, jwtModuleSection(), ConfigModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, SessionService],
})
export class AuthModule {}

function jwtModuleSection() {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    global: true,
    //! ENV-es megoldásra ez volt a megoldás, dokumentáció és copilot segitségével megtaláltam!
    useFactory: async (config: ConfigService) => ({
      secret: config.get<string>('JWT_TOKEN_SECRET'),
    }),
    inject: [ConfigService],
  });
}
