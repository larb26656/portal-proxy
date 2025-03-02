import { MockApiController } from './mock-api.controller';
import { Module } from '@nestjs/common';
import { MockApiService } from './mock-api.service';
import { MockApiRepository } from './mock-api.repository';

@Module({
    imports: [],
    controllers: [MockApiController,],
    providers: [MockApiRepository, MockApiService],
    exports: [MockApiService]
})
export class MockApiModule {}
