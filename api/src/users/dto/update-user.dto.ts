import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsEmail(
    {},
    {
      message:
        'Kérjük, érvényes e-mail cím formátumot adjon meg. (kisbela@pelda.hu)',
    },
  )
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(5, 15, {
    message:
      'A felhasználó név legalább 8 és maximum 15 karakter hosszúnak kell lennie.',
  })
  username: string;
}

export class UpdatePasswordDto extends UpdateUserDto {
  @ApiPropertyOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűt, számot, valamint speciális karaktert.',
    },
  )
  password: string;
}
