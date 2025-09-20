import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('CashTracker API')
    .setDescription(
      'Ez az első nestJS projektem, ezzel a projektel gyakorlom és ismerem meg a nestJS-t, a projekt során a [nestJS hivatalos dokumentációját](https://docs.nestjs.com/) fogom végigkövetni, és próbálom a legkevesebb AI-t segítséget használni.',
    )
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
