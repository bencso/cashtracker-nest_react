import { Product } from 'src/product/entities/product.entity';
export declare class Pantry {
    id: number;
    product: Product;
    amount: number;
    expiredAt: Date;
    createdAt: Date;
}
