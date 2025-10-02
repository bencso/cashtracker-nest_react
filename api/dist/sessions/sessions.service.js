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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const sessions_entity_1 = require("./entities/sessions.entity");
let SessionService = class SessionService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async sessionsIsValid(userId, req) {
        const dbData = await this.dataSource
            .getRepository(sessions_entity_1.Sessions)
            .createQueryBuilder('sessions')
            .where('sessions.userId = :userId', { userId: userId })
            .getOne();
        const requestUser = {
            user_agent: req.headers['user-agent'],
            ip: req.ip
        };
        const validUser = dbData.user_data === requestUser;
        console.log(validUser);
        console.log(req?.cookies?.refreshToken);
    }
};
exports.SessionService = SessionService;
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionService.prototype, "sessionsIsValid", null);
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SessionService);
//# sourceMappingURL=sessions.service.js.map