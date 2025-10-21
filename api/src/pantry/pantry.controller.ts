import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('pantry')
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(
    @Req() request: Request,
    @Body() createPantryItemDto: CreatePantryItemDto,
  ) {
    return this.pantryService.create(request, createPantryItemDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getUserPantry(@Req() request: Request) {
    return this.pantryService.getUserPantry(request);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  remove(@Req() request: Request, @Param('id') id: string) {
    return this.pantryService.remove(request, +id);
  }
}
