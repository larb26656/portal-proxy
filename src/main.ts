import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomProxyMiddleware } from './custom-proxy-middleware';


function printAppInfo() {
  const blueColorCode = '\u001b[34m';
  const orangeColorCode = '\u001b[38;5;208m';
  const resetColorCode = '\u001b[0m';
  const version = process.env.npm_package_version;
  
  console.log(`${blueColorCode}() ${resetColorCode}Postal proxy ${orangeColorCode}()${resetColorCode} v.${version}`);  
}

async function bootstrap() {
  printAppInfo();
  // create custom proxy and assign to global
  global.coreProxy = new CustomProxyMiddleware('proxy.json');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
