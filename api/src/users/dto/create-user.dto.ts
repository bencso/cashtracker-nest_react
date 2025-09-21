import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 20)
  username: string;

  @IsStrongPassword()
  password: string;
}
