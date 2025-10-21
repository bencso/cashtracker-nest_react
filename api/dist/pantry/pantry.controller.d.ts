import { PantryService } from './pantry.service';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { Request } from 'express';
export declare class PantryController {
    private readonly pantryService;
    constructor(pantryService: PantryService);
    create(request: Request, createPantryItemDto: CreatePantryItemDto): Promise<{
        message: string[];
        statusCode: number;
    }>;
    getUserPantry(request: Request): Promise<{
        message: string[];
        statusCode: number;
        products: import("./entities/pantry.entity").Pantry[];
    } | {
        message: string[];
        statusCode: number;
        products?: undefined;
    }>;
    remove(request: Request, id: string): Promise<{
        message: string[];
        statusCode: number;
    }>;
}
