import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    //!FIXÁLNI kell
    //!ERROR: [Nest] 91096  - 09/21/2025, 4:20:33 PM: ERROR [ExceptionsHandler] secretOrPrivateKey must have a value
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
