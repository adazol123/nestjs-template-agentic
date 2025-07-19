import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductsModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });
  
  await app.listen();
  console.log('Products microservice is listening');
}

bootstrap();