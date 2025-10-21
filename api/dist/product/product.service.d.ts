import { DataSource } from 'typeorm';
import { ProductDto } from './dto/Product';
import { CreateProductDto } from './dto/CreateProductDto';
import { SessionService } from 'src/sessions/sessions.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
export declare class ProductService {
    private readonly usersService;
    private readonly dataSource;
    private readonly sessionsService;
    constructor(usersService: UsersService, dataSource: DataSource, sessionsService: SessionService);
    getItemById(code: string): Promise<ProductDto>;
    getItemId(code: string): Promise<any>;
    create(request: Request, createProductDto: CreateProductDto): Promise<any>;
}
