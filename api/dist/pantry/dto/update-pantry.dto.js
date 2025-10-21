"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePantryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_pantry_dto_1 = require("./create-pantry.dto");
class UpdatePantryDto extends (0, swagger_1.PartialType)(create_pantry_dto_1.CreatePantryDto) {
}
exports.UpdatePantryDto = UpdatePantryDto;
//# sourceMappingURL=update-pantry.dto.js.map