import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 8888;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  await app.listen(PORT);
  console.log('Listening on port', PORT);
}
bootstrap();
