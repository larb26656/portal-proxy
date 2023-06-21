import { Injectable } from '@nestjs/common';
import { MockApiRepository } from './mock-api.repository';
import { HttpMethod, MockApiDto } from './model/mock-api.dto';

@Injectable()
export class MockApiService {
    constructor(private readonly mockApiRepository: MockApiRepository) {
    }

    get(): MockApiDto[] {
        return this.mockApiRepository.get();
    }

    findByReq(method: HttpMethod, path: string): MockApiDto {
        return this.mockApiRepository.findByReq(method, path);
    }
}
