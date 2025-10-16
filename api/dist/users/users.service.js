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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
let UsersService = class UsersService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(createUserDto) {
        try {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into(user_entity_1.User)
                .values([
                {
                    email: createUserDto.email,
                    password: createUserDto.password,
                    username: createUserDto.username,
                },
            ])
                .execute();
            return {
                message: [`Sikeres regisztráció!`],
                statusCode: 200,
            };
        }
        catch (err) {
            return {
                message: err.message,
                statusCode: err.statusCode,
            };
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(id) {
        return await this.dataSource
            .getRepository(user_entity_1.User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: id })
            .getOne();
    }
    async updatePassword({ password, userId }) {
        try {
            await this.dataSource
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set([
                {
                    password: password,
                },
            ])
                .where("user = :id", { id: userId })
                .execute();
            return {
                message: [`Sikeres jelszóváltoztatás!`],
                statusCode: 200,
            };
        }
        catch (err) {
            return {
                message: err.message,
                statusCode: err.statusCode,
            };
        }
    }
    async findUser(email) {
        const user = await this.dataSource
            .getRepository(user_entity_1.User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email: email })
            .getOne();
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
        };
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map