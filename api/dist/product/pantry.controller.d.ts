import { PantryService } from './product.service';
export declare class ProductController {
    private readonly pantryService;
    constructor(pantryService: PantryService);
    getItemByCode(code: string): Promise<import("./dto/PantryItem").PantryItemDto>;
}
