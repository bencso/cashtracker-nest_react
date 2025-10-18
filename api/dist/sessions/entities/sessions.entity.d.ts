import { User } from 'src/users/entities/user.entity';
export declare class UserData {
    user_agent: string;
    ip: string;
}
export declare class Sessions {
    session_id: string;
    user: User;
    user_data: string;
    token: string;
    createdAt: Date;
}
