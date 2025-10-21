import { PartialType } from '@nestjs/swagger';
import { CreatePantryDto } from './create-pantry.dto';

export class UpdatePantryDto extends PartialType(CreatePantryDto) {}
