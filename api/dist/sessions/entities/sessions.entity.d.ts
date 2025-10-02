import { User } from 'src/users/entities/user.entity';
declare class UserData {
    user_agent: String;
    ip: String;
}
export declare class Sessions {
    session_id: string;
    user: User;
    user_data: UserData;
    token: string;
    createdAt: Date;
}
export {};
