import { MockApiModule } from './feature/mock-api/mock-api.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreMiddleware } from './middleware/core.middleware';

@Module({
  imports: [MockApiModule],
  controllers: [AppController],
  providers: [
      AppService
 ],
})
export class AppModule {

      configure(consumer: MiddlewareConsumer) {
            consumer
                  .apply(CoreMiddleware)
                  .forRoutes('*');
      }
}
