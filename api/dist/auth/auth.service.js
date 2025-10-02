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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const login_dto_1 = require("./dto/login.dto");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const sessions_service_1 = require("../sessions/sessions.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, config, sessionsService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
        this.sessionsService = sessionsService;
    }
    async login(body, request, response) {
        try {
            const token = (await this.signIn(body.email, body.password, request));
            if (token.tokens) {
                response.cookie('accessToken', token.tokens.access, {
                    maxAge: +this.config.get('JWT_TOKEN_TIME'),
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });
                return response.json({
                    message: token.message,
                    statusCode: token.statusCode || 404,
                    data: token.data || null,
                });
            }
            else {
                throw new common_1.UnauthorizedException({
                    message: 'Érvénytelen bejelentkezési adat(ok)',
                    status: 401,
                });
            }
        }
        catch (error) {
            throw new common_1.ConflictException({
                message: [error.message],
                statusCode: error.status,
            });
        }
    }
    async signIn(email, password, request) {
        try {
            const user = (await this.usersService.findUser(email));
            const compared = await bcrypt.compare(password, user.password);
            if (!compared) {
                throw new common_1.UnauthorizedException({
                    message: 'Érvénytelen bejelentkezési adat(ok)',
                    status: 401,
                });
            }
            else {
                const tokens = await this.createTokens(user, request);
                return {
                    message: ['Sikeres bejelentkezés'],
                    statusCode: 200,
                    data: { access: tokens.access },
                    tokens: {
                        refresh: tokens.refresh,
                        access: tokens.access,
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
        if (request && request.headers && request?.headers.authorization) {
            const refreshToken = request?.headers.authorization.split('Bearer ')[1];
            try {
                const verifiedToken = await this.jwtService.verifyAsync(refreshToken, {
                    secret: this.config.get('JWT_REFRESH_SECRET'),
                });
                const user = await this.usersService.findOne(verifiedToken.sub);
                if (!this.sessionsService.sessionsIsValid(request))
                    throw new common_1.UnauthorizedException('Érvénytelen bejelentkezési adatok');
                const tokens = await this.createTokens(user, request);
                return { refreshToken: tokens.refresh, accessToken: tokens.access };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Érvénytelen vagy lejárt refresh token: ' + error);
            }
        }
        else
            throw new common_1.UnauthorizedException({
                message: 'Érvénytelen bejelentkezési adat(ok)',
                status: 401,
            });
    }
    async createAccessToken(user, user_data) {
        const payload = {
            email: user.email,
            user_data: user_data,
        };
        return this.jwtService.signAsync(payload, {
            expiresIn: this.config.get('JWT_TOKEN_TIME'),
        });
    }
    async createRefreshToken(payload) {
        return this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_TIME'),
        });
    }
    async createTokens(user, request) {
        const payload = {
            sub: user.id,
            tokenId: (0, crypto_1.randomUUID)(),
        };
        const user_data = {
            ip: request.ip,
            user_agent: request.headers['user-agent'],
        };
        const accessToken = await this.createAccessToken(user, user_data);
        await this.sessionsService.createSessionInDb(payload.sub, accessToken, user_data, payload.tokenId);
        return {
            refresh: await this.createRefreshToken(payload),
            access: accessToken,
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.BodyLogin, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        sessions_service_1.SessionService])
], AuthService);
//# sourceMappingURL=auth.service.js.map