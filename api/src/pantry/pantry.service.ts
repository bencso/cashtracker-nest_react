import { Injectable } from '@nestjs/common';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { UsersService } from 'src/users/users.service';
import { DataSource, MoreThan, MoreThanOrEqual } from 'typeorm';
import { SessionService } from 'src/sessions/sessions.service';
import { Request } from 'express';
import { ProductService } from 'src/product/product.service';
import { Pantry } from './entities/pantry.entity';

@Injectable()
export class PantryService {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    private readonly sessionsService: SessionService,
    private readonly productService: ProductService
  ) { }
  async create(request: Request, createPantryItemDto: CreatePantryItemDto) {
    const requestUser = await this.sessionsService.validateAccessToken(request);
    const user = await this.usersService.findUser(requestUser.email);

    let productId = null;

    try {
      if (user) {
        productId = await this.productService.getItemId(createPantryItemDto.code);

        if (productId === null) {
          const createdProduct = await this.productService.create(request, {
            product_name: createPantryItemDto.product_name,
            code: createPantryItemDto.code
          });
          productId = createdProduct?.id ?? createdProduct;
        }

        const result = await this.dataSource.getRepository(Pantry)
          .createQueryBuilder()
          .insert()
          .values({
            user: { id: user.id },
            product: { id: productId },
            amount: createPantryItemDto.amount,
            expiredAt: createPantryItemDto.expiredAt ?? new Date()
          })
          .execute();

        console.log(result);

        return { message: ["Sikeres létrehozás"], statusCode: 200 }
      }
    }
    catch { return { message: ["Sikertelen létrehozás"], statusCode: 403 } }
  }

  async getUserPantry(request: Request) {
    const requestUser = await this.sessionsService.validateAccessToken(request);
    const user = await this.usersService.findUser(requestUser.email);

    if (user) {
      const products = await this.dataSource.getRepository(Pantry).find({
        where: {
          user: { id: user.id },
          expiredAt: MoreThanOrEqual(new Date())
        },
        order: { id: 'ASC' }
      });

      return products.length > 0 ? {
        message: ["Sikeres lekérdezés"],
        statusCode: 200,
        products: products
      } : { message: ["Nincs semmi a raktárjában a felhasználónak!"], statusCode: 404, products: products }
    } else return { message: ["Sikertelen lekérdezés"], statusCode: 404 }
  }

  remove(request: Request, id: number) { }
}
