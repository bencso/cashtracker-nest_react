import { ReturnDto } from 'src/dto/return.dto';
export declare class BodyLogin {
    username: string;
    password: string;
}
export declare class LoginDto extends ReturnDto {
    data: ReturnData;
}
declare class ReturnData {
    jwt: string;
}
export {};
