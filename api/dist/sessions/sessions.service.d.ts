import { DataSource } from 'typeorm';
import { Request } from 'express';
export declare class SessionService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    sessionsIsValid(userId: Number, req: Request): Promise<void>;
}
