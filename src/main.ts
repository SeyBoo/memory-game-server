import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 8888;
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  console.log('Listening on port', PORT);
}
bootstrap();
