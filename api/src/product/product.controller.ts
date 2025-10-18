import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly pantryService: ProductService) {}

  @Get('/items/:code')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getItemByCode(@Param('code') code: string) {
    return this.pantryService.getItemById(code);
  }
}
