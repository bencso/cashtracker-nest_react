import { ApiProperty } from '@nestjs/swagger';

export class CreatePantryDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
