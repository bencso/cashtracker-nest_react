import { DataSource } from 'typeorm';
import { Request } from 'express';
export declare class SessionService {
    dataSource: DataSource;
    constructor(dataSource: DataSource);
    getSessionByUserId(userId: Number, req: Request): Promise<void>;
}
