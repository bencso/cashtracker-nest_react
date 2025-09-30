import { User } from 'src/users/entities/user.entity';
export declare class Sessions {
    token: string;
    ip: string;
    user: User;
    user_agent: string;
    createdAt: Date;
}
