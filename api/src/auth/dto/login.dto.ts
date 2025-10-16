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
  refreshToken?: string;
  accessToken?: string;
  username?: string;
  email?: string;
}

class ReturnData {
  access: string;
}
