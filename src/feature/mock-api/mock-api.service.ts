import { BadRequestException, Injectable } from '@nestjs/common';
import { MockApiRepository } from './mock-api.repository';
import { HttpMethod, MockApiEntity } from '../../entity/mock-api.entity';
import { MockApiNotFoundException } from 'src/exception/mock-api-not-found.exception';

@Injectable()
export class MockApiService {
    constructor(private readonly mockApiRepository: MockApiRepository) {
    }

    create(entity: MockApiEntity): MockApiEntity {
        entity.id = null;

        return this.mockApiRepository.save(entity);
    }

    update(entity: MockApiEntity): MockApiEntity {
        const id = entity.id;

        if (!id) {
            throw new BadRequestException(`Edit required id!`);
        }

        const findEntity = this.mockApiRepository.findById(id);

        if (!findEntity) {
            throw new MockApiNotFoundException(id);
        }

        return this.mockApiRepository.save(entity);
    }

    remove(id: string) {
        const findEntity = this.mockApiRepository.findById(id);

        if (!findEntity) {
            throw new MockApiNotFoundException(id);
        }
        
        this.mockApiRepository.deleteById(id);
    }

    findAll(): MockApiEntity[] {
        return this.mockApiRepository.find();
    }

    findOne(id: string): MockApiEntity {
        return this.mockApiRepository.findById(id);
    }

    getByReq(method: HttpMethod, path: string): MockApiEntity {
        return this.mockApiRepository.getByReq(method, path);
    }
}
