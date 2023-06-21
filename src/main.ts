import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomProxyMiddleware } from './custom-proxy-middleware';



async function bootstrap() {
  // create custom proxy and assign to global
  global.coreProxy = new CustomProxyMiddleware('proxy.json');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
