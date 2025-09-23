import { ReturnDto } from 'src/dto/return.dto';
export declare class BodyRegistration {
    email: string;
    username: string;
    password: string;
}
export declare class RegistrationDto extends ReturnDto {
    data?: ReturnData;
}
declare class ReturnData {
}
export {};
