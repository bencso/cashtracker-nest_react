import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
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
  async login(
    @Body() body: BodyLogin,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.authService.login(body, request, response);
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
