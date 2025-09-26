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
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, config) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signIn(email, password) {
        try {
            const user = await this.usersService.findUser(email);
            const compared = await bcrypt.compare(password, user.password);
            if (!compared) {
                throw new common_1.UnauthorizedException({
                    message: 'Érvénytelen bejelentkezési adat(ok)',
                    status: 401,
                });
            }
            else {
                const payload = { id: user.id, username: user.username };
                const getAcessToken = this.jwtService.signAsync(payload, {
                    expiresIn: this.config.get('JWT_TOKEN_TIME'),
                });
                const getRefreshToken = this.jwtService.signAsync({ username: user.username }, {
                    secret: this.config.get('JWT_REFRESH_SECRET'),
                    expiresIn: this.config.get('JWT_REFRESH_TIME'),
                });
                const access = await getAcessToken;
                return {
                    message: ['Sikeres bejelentkezés'],
                    statusCode: 200,
                    data: { access },
                    tokens: {
                        refresh: await getRefreshToken,
                        access,
                    },
                };
            }
        }
        catch (err) {
            return {
                message: [err.message],
                statusCode: err.status,
            };
        }
    }
    async registration(body) {
        const salt = 10;
        try {
            const hashedPassword = await bcrypt.hash(body.password, salt);
            await this.usersService
                .create({
                email: body.email,
                username: body.username,
                password: hashedPassword,
            })
                .then((value) => {
                if (value.statusCode !== 200)
                    if (String(value.message).includes('ER_DUP_ENTRY')) {
                        throw new common_1.ConflictException('Ez az email cím már regisztrálva van!');
                    }
                    else {
                        throw new common_1.ConflictException(value);
                    }
            })
                .catch((error) => {
                throw new common_1.ConflictException(error);
            });
            return {
                message: ['Sikeres regisztrációs!'],
                statusCode: 200,
                data: {},
            };
        }
        catch (err) {
            return {
                message: [err.message],
                statusCode: err.status,
            };
        }
    }
    async refresh(request) {
        if (request &&
            request.headers &&
            request.headers['cookie'] &&
            String(request.headers['cookie']).includes('refreshToken=')) {
            const refreshToken = String(request.headers['cookie'])
                .split('refreshToken=')[1]
                .split(';')[0];
            return {
                message: refreshToken,
            };
        }
        else
            throw new common_1.UnauthorizedException({
                message: 'Érvénytelen bejelentkezési adat(ok)',
                status: 401,
            });
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