"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PantryService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("typeorm");
const sessions_service_1 = require("../sessions/sessions.service");
const product_service_1 = require("../product/product.service");
const pantry_entity_1 = require("./entities/pantry.entity");
let PantryService = class PantryService {
    constructor(usersService, dataSource, sessionsService, productService) {
        this.usersService = usersService;
        this.dataSource = dataSource;
        this.sessionsService = sessionsService;
        this.productService = productService;
    }
    async create(request, createPantryItemDto) {
        const requestUser = await this.sessionsService.validateAccessToken(request);
        const user = await this.usersService.findUser(requestUser.email);
        let productId = null;
        try {
            if (user) {
                productId = await this.productService.getItemId(createPantryItemDto.code);
                if (!productId) {
                    const createdProduct = await this.productService.create(request, {
                        product_name: createPantryItemDto.product_name,
                        code: createPantryItemDto.code,
                    });
                    productId = createdProduct?.id ?? createdProduct;
                }
                await this.dataSource
                    .getRepository(pantry_entity_1.Pantry)
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
        }
        catch {
            return { message: ['Sikertelen létrehozás'], statusCode: 403 };
        }
    }
    async getUserPantry(request) {
        const requestUser = await this.sessionsService.validateAccessToken(request);
        const user = await this.usersService.findUser(requestUser.email);
        if (user) {
            const products = await this.dataSource.getRepository(pantry_entity_1.Pantry).find({
                where: {
                    user: { id: user.id },
                    expiredAt: (0, typeorm_1.MoreThanOrEqual)(new Date()),
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
            products.map((value) => {
                returnProducts.push({
                    index: value.product.id,
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
        }
        else
            return { message: ['Sikertelen lekérdezés'], statusCode: 404 };
    }
    async remove(request, id) {
        const requestUser = await this.sessionsService.validateAccessToken(request);
        const user = await this.usersService.findUser(requestUser.email);
        if (user) {
            const product = await this.dataSource
                .getRepository(pantry_entity_1.Pantry)
                .createQueryBuilder()
                .where({
                id: id,
                user: user,
            })
                .getCount();
            if (product > 0) {
                try {
                    this.dataSource.getRepository(pantry_entity_1.Pantry).delete({
                        id: id,
                        user: user,
                    });
                    return { message: ['Sikeres törlés'], statusCode: 200 };
                }
                catch {
                    return { message: ['Sikertelen törlés'], statusCode: 404 };
                }
            }
            else
                return { message: ['Sikertelen törlés'], statusCode: 404 };
        }
    }
};
exports.PantryService = PantryService;
exports.PantryService = PantryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_1.DataSource,
        sessions_service_1.SessionService,
        product_service_1.ProductService])
], PantryService);
//# sourceMappingURL=pantry.service.js.map