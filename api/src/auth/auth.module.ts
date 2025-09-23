import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [UsersModule, jwtModuleSection()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

function jwtModuleSection() {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    global: true,
    //! ENV-es megoldásra ez volt a megoldás, dokumentáció és copilot segitségével megtaláltam!
    useFactory: async (config: ConfigService) => ({
      secret: config.get<string>('JWT_TOKEN_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
    inject: [ConfigService],
  });
}
