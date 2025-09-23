import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodyLogin } from './dto/login.dto';
import { BodyRegistration } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: BodyLogin) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  registration(@Body() body: BodyRegistration) {
    return this.authService.registration(body);
  }
}
