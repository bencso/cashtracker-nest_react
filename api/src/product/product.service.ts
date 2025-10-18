import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PantryItemDto } from './dto/PantryItem';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  async getItemById(code: string): Promise<PantryItemDto> {
    const pantry = await this.dataSource
      .getRepository(Product)
      .createQueryBuilder()
      .select()
      .where({
        code: code,
      })
      .execute();

    if (pantry) return pantry;
    else return null;
  }
}
