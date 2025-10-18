import { ProductService } from './product.service';
export declare class ProductController {
    private readonly pantryService;
    constructor(pantryService: ProductService);
    getItemByCode(code: string): Promise<import("./dto/PantryItem").PantryItemDto>;
}
