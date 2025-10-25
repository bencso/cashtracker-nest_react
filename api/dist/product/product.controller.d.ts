import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getItemByCode(code: string): Promise<import("./dto/Product").ProductDto>;
    getItemByKeyword(keyword: string): Promise<import("./dto/Product").ProductDto>;
}
