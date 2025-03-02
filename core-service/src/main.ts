import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomProxyMiddleware } from './custom-proxy-middleware';
import { ConfigDatabase } from './config-database';
import { HttpExceptionFilter } from './filter/http-exception.filter';

function printAppInfo() {
  const blueColorCode = '\u001b[34m';
  const orangeColorCode = '\u001b[38;5;208m';
  const resetColorCode = '\u001b[0m';
  const version = process.env.npm_package_version;
  
  console.log(`${blueColorCode}() ${resetColorCode}Postal proxy ${orangeColorCode}()${resetColorCode} v.${version}`);  
}

async function bootstrap() {
  printAppInfo();
  
  global.configDatabase = new ConfigDatabase(
    'config/mock-api.json',
    'config/proxy.json'
  );
  
  // create custom proxy and assign to global
  global.coreProxy = new CustomProxyMiddleware(global.configDatabase.proxyDBPath);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap();
