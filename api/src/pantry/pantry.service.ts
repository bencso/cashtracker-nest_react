import { Injectable } from '@nestjs/common';
import { CreatePantryDto } from './dto/create-pantry.dto';
import { UpdatePantryDto } from './dto/update-pantry.dto';

@Injectable()
export class PantryService {
  create(createPantryDto: CreatePantryDto) {
    return 'This action adds a new pantry';
  }

  findAll() {
    return `This action returns all pantry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pantry`;
  }

  update(id: number, updatePantryDto: UpdatePantryDto) {
    return `This action updates a #${id} pantry`;
  }

  remove(id: number) {
    return `This action removes a #${id} pantry`;
  }
}
