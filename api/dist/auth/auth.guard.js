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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("../sessions/sessions.service");
let AuthGuard = class AuthGuard {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const isValid = !this.sessionService.sessionsIsValid(request);
            if (!isValid)
                throw new common_1.UnauthorizedException({
                    message: 'Érvénytelen bejelentkezési adat(ok)',
                    status: 401,
                });
            else
                return isValid;
        }
        catch {
            throw new common_1.UnauthorizedException({
                message: 'Érvénytelen bejelentkezési adat(ok)',
                status: 401,
            });
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sessions_service_1.SessionService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map