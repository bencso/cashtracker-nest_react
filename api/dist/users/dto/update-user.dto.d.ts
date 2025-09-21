import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email: string;
    username: string;
}
export declare class UpdatePasswordDto extends UpdateUserDto {
    password: string;
}
export {};
