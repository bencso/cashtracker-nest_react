import { Injectable } from '@nestjs/common';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { UsersService } from 'src/users/users.service';
import { DataSource, MoreThanOrEqual } from 'typeorm';
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
    private readonly productService: ProductService,
  ) {}
  async create(request: Request, createPantryItemDto: CreatePantryItemDto) {
    const requestUser = await this.sessionsService.validateAccessToken(request);
    const user = await this.usersService.findUser(requestUser.email);

    let productId = null;

    try {
      if (user) {
        productId = await this.productService.getItemId(
          createPantryItemDto.code,
        );

        if (!productId) {
          const createdProduct = await this.productService.create(request, {
            product_name: createPantryItemDto.product_name,
            code: createPantryItemDto.code,
          });
          productId = createdProduct?.id ?? createdProduct;
        }

        await this.dataSource
          .getRepository(Pantry)
          .createQueryBuilder()
          .insert()
          .values({
            user: { id: user.id },
            product: { id: productId },
            amount: createPantryItemDto.amount,
            expiredAt: createPantryItemDto.expiredAt ?? new Date(),
          })
          .execute();

        return { message: ['Sikeres létrehozás'], statusCode: 200 };
      }
    } catch {
      return { message: ['Sikertelen létrehozás'], statusCode: 403 };
    }
  }

  async getUserPantry(request: Request) {
    const requestUser = await this.sessionsService.validateAccessToken(request);
    const user = await this.usersService.findUser(requestUser.email);

    if (user) {
      const products = await this.dataSource.getRepository(Pantry).find({
        where: {
          user: { id: user.id },
          expiredAt: MoreThanOrEqual(new Date()),
        },
        relations: {
          product: true,
        },
        order: { id: 'ASC' },
        select: {
          product: {
            code: true,
            product_name: true,
            id: true,
          },
          expiredAt: true,
          amount: true,
          id: true,
        },
      });

      const returnProducts = [];
      products.map((value: Pantry) => {
        returnProducts.push({
          index: value.id,
          name: value.product.product_name,
          amount: value.amount,
          expiredAt: value.expiredAt,
          code: value.product.code,
        });
      });

      return products.length > 0
        ? {
            message: ['Sikeres lekérdezés'],
            statusCode: 200,
            products: returnProducts,
          }
        : {
            message: ['Nincs semmi a raktárjában a felhasználónak!'],
            statusCode: 404,
            products: products,
          };
    } else return { message: ['Sikertelen lekérdezés'], statusCode: 404 };
  }

  async remove(request: Request, id: number) {
    const requestUser = await this.sessionsService.validateAccessToken(request);
    const user = await this.usersService.findUser(requestUser.email);

    console.log(id);
    if (user) {
      const product = await this.dataSource
        .getRepository(Pantry)
        .createQueryBuilder()
        .where({
          id: id,
          user: user,
        })
        .getCount();

      if (product > 0) {
        try {
          this.dataSource.getRepository(Pantry).delete({
            id: id,
            user: user,
          });

          return { message: ['Sikeres törlés'], statusCode: 200 };
        } catch {
          return { message: ['Sikertelen törlés'], statusCode: 404 };
        }
      } else return { message: ['Sikertelen törlés'], statusCode: 404 };
    }
  }
}
