import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { BodyLogin, LoginDto } from './dto/login.dto';
import { BodyRegistration } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  //TODO: Utána nézni a passthrough után
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: BodyLogin, @Res() response: Response) {
    try {
      const token = (await this.authService.signIn(
        body.email,
        body.password,
      )) as LoginDto;

      if (token.tokens) {
        response.cookie('accessToken', token.tokens.access, {
          maxAge: +this.config.get<string>('JWT_TOKEN_TIME'),
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return response.json({ token: token.tokens.refresh });
      } else {
        throw new UnauthorizedException({
          message: 'Érvénytelen bejelentkezési adat(ok)',
          status: 401,
        });
      }
    } catch (error) {
      throw new ConflictException({
        message: [error.message],
        statusCode: error.status,
      });
    }
  }

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  registration(@Body() body: BodyRegistration) {
    return this.authService.registration(body);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() request: Request) {
    return this.authService.refresh(request);
  }
}
