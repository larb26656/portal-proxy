import { Injectable } from '@nestjs/common';
import { MockApiRepository } from './mock-api.repository';
import { HttpMethod, MockApiDto } from './model/mock-api.dto';

@Injectable()
export class MockApiService {
    constructor(private readonly mockApiRepository: MockApiRepository) {
    }

    find(): MockApiDto[] {
        return this.mockApiRepository.find();
    }

    getByReq(method: HttpMethod, path: string): MockApiDto {
        return this.mockApiRepository.getByReq(method, path);
    }
}
