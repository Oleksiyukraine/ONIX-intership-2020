import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './components/app/app.module';
import * as moment from 'moment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const logger: Logger = new Logger('Main file');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.SERVER_PORT || 3100;

  const options = new DocumentBuilder()
    .setTitle('NodeJs Intership 2021 v1')
    .setDescription(`API started at ${moment().format('YY-MM-DD in HH:MM:SS')}`)
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () =>
    logger.verbose(`The server is running on ${port} port`),
  );
}
bootstrap();
