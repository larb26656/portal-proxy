import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

export var proxyMiddleware;

async function bootstrap() {
  // create proxy middleware
  proxyMiddleware = createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  
}
bootstrap();
