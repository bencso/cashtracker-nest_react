import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Pantry {
    user: User;
    id: number;
    product: Product;
    amount: number;
    expiredAt: Date;
    createdAt: Date;
}
