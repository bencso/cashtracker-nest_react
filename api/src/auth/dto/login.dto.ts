import { ApiProperty } from '@nestjs/swagger';
import { ReturnDto } from 'src/dto/return.dto';

export class BodyLogin {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginDto extends ReturnDto {
  data?: ReturnData;
  tokens?: TokenData;
}

class ReturnData {
  access: string;
}

class TokenData {
  refresh: string;
  access: string;
}
