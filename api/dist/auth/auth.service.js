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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, config) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signIn(email, password) {
        try {
            const user = await this.usersService.findUser(email);
            if (password != user.password)
                throw new common_1.UnauthorizedException({
                    message: 'Érvénytelen bejelentkezési adat(ok)',
                    status: 401,
                });
            const payload = { id: user.id, username: user.username };
            const getAcessToken = this.jwtService.signAsync(payload, {
                expiresIn: this.config.get('JWT_TOKEN_TIME'),
            });
            const getRefreshToken = this.jwtService.signAsync({ username: user.username }, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                expiresIn: this.config.get('JWT_REFRESH_TIME'),
            });
            return {
                message: ['Sikeres bejelentkezés'],
                statusCode: 200,
                data: { jwt: await getAcessToken },
            };
        }
        catch (err) {
            return {
                message: [err.message],
                statusCode: err.status,
            };
        }
    }
    async registration(body) {
        return {
            message: ['Sikeres regisztrációs!'],
            statusCode: 201,
            data: {},
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map