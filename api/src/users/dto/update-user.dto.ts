import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 20)
  username: string;
}

export class UpdatePasswordDto extends UpdateUserDto {
  @IsStrongPassword()
  password: string;
}
