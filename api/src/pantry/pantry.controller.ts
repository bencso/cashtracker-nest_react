import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/create-pantry.dto';

@Controller('pantry')
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Post()
  create(@Body() createPantryDto: CreatePantryDto) {
    return this.pantryService.create(createPantryDto);
  }

  @Get()
  findAll() {
    return this.pantryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pantryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pantryService.remove(+id);
  }
}
