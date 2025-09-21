import { ReturnDto } from 'src/dto/return.dto';

export class LoginDto extends ReturnDto {
  data: ReturnData;
}

class ReturnData {
  username: string;
}
