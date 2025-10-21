import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/create-pantry.dto';
export declare class PantryController {
    private readonly pantryService;
    constructor(pantryService: PantryService);
    create(createPantryDto: CreatePantryDto): string;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
