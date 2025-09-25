import { ReturnDto } from 'src/dto/return.dto';
export declare class BodyLogin {
    email: string;
    password: string;
}
export declare class LoginDto extends ReturnDto {
    data?: ReturnData;
    tokens?: TokenData;
}
declare class ReturnData {
    access: string;
}
declare class TokenData {
    refresh: string;
    access: string;
}
export {};
