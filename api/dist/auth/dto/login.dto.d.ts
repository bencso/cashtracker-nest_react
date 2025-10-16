import { ReturnDto } from 'src/dto/return.dto';
export declare class BodyLogin {
    email: string;
    password: string;
}
export declare class LoginDto extends ReturnDto {
    data?: ReturnData;
    refreshToken?: string;
    accessToken?: string;
    username?: string;
    email?: string;
}
declare class ReturnData {
    access: string;
}
export {};
