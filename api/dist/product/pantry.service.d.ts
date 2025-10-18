import { DataSource } from 'typeorm';
import { PantryItemDto } from './dto/PantryItem';
export declare class PantryService {
    private dataSource;
    constructor(dataSource: DataSource);
    getItemById(code: string): Promise<PantryItemDto>;
}
