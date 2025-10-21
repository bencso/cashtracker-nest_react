import { CreatePantryDto } from './dto/create-pantry.dto';
import { UpdatePantryDto } from './dto/update-pantry.dto';
export declare class PantryService {
    create(createPantryDto: CreatePantryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePantryDto: UpdatePantryDto): string;
    remove(id: number): string;
}
