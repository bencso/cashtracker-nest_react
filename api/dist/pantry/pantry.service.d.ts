import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { SessionService } from 'src/sessions/sessions.service';
import { Request } from 'express';
import { ProductService } from 'src/product/product.service';
import { Pantry } from './entities/pantry.entity';
export declare class PantryService {
    private readonly usersService;
    private readonly dataSource;
    private readonly sessionsService;
    private readonly productService;
    constructor(usersService: UsersService, dataSource: DataSource, sessionsService: SessionService, productService: ProductService);
    create(request: Request, createPantryItemDto: CreatePantryItemDto): Promise<{
        message: string[];
        statusCode: number;
    }>;
    getUserPantry(request: Request): Promise<{
        message: string[];
        statusCode: number;
        products: Pantry[];
    } | {
        message: string[];
        statusCode: number;
        products?: undefined;
    }>;
    remove(request: Request, id: number): void;
}
