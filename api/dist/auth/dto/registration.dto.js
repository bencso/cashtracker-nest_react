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
exports.RegistrationDto = exports.BodyRegistration = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const return_dto_1 = require("../../dto/return.dto");
class BodyRegistration {
}
exports.BodyRegistration = BodyRegistration;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)({}, {
        message: 'Kérjük, érvényes e-mail cím formátumot adjon meg. (kisbela@pelda.hu)',
    }),
    __metadata("design:type", String)
], BodyRegistration.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 15, {
        message: 'A felhasználó név legalább 8 és maximum 15 karakter hosszúnak kell lennie.',
    }),
    __metadata("design:type", String)
], BodyRegistration.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűt, számot, valamint speciális karaktert.',
    }),
    __metadata("design:type", String)
], BodyRegistration.prototype, "password", void 0);
class RegistrationDto extends return_dto_1.ReturnDto {
}
exports.RegistrationDto = RegistrationDto;
class ReturnData {
}
//# sourceMappingURL=registration.dto.js.map