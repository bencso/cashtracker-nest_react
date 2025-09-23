"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        abortOnError: false,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CashTracker API')
        .setDescription('Ez az első nestJS projektem, ezzel a projekttel gyakorlom és ismerem meg a nestJS-t, a projekt során a [nestJS hivatalos dokumentációját](https://docs.nestjs.com/) fogom végigkövetni, és próbálom a legkevesebb AI-t segítséget használni.')
        .setOpenAPIVersion('3.1.1')
        .setLicense('MIT licensz', 'https://opensource.org/license/mit')
        .setVersion('0.1')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new common_1.ValidationPipe());
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map