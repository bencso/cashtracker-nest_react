import { ApiProperty } from '@nestjs/swagger';
import { ReturnDto } from 'src/dto/return.dto';

export class BodyLogin {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginDto extends ReturnDto {
  data: ReturnData;
}

class ReturnData {
  jwt: string;
}
