import { ApiProperty } from '@nestjs/swagger';

export class CreatePantryItemDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  product_name?: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  expiredAt?: Date;
}
