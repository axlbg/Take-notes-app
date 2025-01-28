import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permite solicitudes desde el frontend
    methods: 'GET,PATCH,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Configuración de puerto
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then(() => console.log('NestJS server running'));
