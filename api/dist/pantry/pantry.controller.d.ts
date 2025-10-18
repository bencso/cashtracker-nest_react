import { PantryService } from './pantry.service';
export declare class ProductController {
    private readonly pantryService;
    constructor(pantryService: PantryService);
    getItemByCode(code: string): Promise<import("./dto/PantryItem").PantryItemDto>;
}
