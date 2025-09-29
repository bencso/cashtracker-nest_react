/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('CashTracker API')
    .setDescription(
      'Ez az első nestJS projektem, ezzel a projekttel gyakorlom és ismerem meg a nestJS-t, a projekt során a [nestJS hivatalos dokumentációját](https://docs.nestjs.com/) fogom végigkövetni, és próbálom a legkevesebb AI-t segítséget használni.',
    )
    .setOpenAPIVersion('3.1.1')
    .setLicense('MIT licensz', 'https://opensource.org/license/mit')
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, documentFactory);
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
