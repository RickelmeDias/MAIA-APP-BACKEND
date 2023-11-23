// Importing .env for all application
import * as dotenv from 'dotenv';
import * as path from 'path';

const dotEnvPath = path.resolve(
  __dirname,
  '..',
  String(process.env.NODE_ENV).toLowerCase().trim() + '.env',
);
dotenv.config({ path: dotEnvPath });

// Application
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = parseInt(process.env.APPLICATION_PORT) || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
    Logger.log('Running in ' + process.env.NODE_ENV + ' mode');
  });
}
bootstrap();
