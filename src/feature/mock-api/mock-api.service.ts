import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MockApiRepository } from './mock-api.repository';
import { MockApiEntity } from '../../entity/mock-api.entity';
import { MockApiNotFoundException } from 'src/exception/mock-api-not-found.exception';
import { JsonUtils } from 'src/utils/json-utils';

@Injectable()
export class MockApiService {

    private readonly logger = new Logger(MockApiService.name);

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

    getByReq(method: string, path: string, contentType: string, body: any): MockApiEntity {

        const requestName = `[${method}:${path}]`;

        let apiPath = path;

        // remove first /
        if (path.startsWith('/')) {
            apiPath = path.slice(1);
        }

        const mockApiEntity = this.mockApiRepository.getByReq(method, apiPath);

        if (!mockApiEntity) {
            return null;
        }

        const requestOption = mockApiEntity.request


        if (requestOption.isStrictBody) {
            const isBodyEqual = JsonUtils.compare(
                body,
                JSON.parse(requestOption.body)
            );

            if (!isBodyEqual) {
                this.logger.debug(`${requestName} body is not equal with request option`);
                return null;
            }
        }

        if (requestOption.isStrictContentType) {
            if (contentType !== requestOption.contentType) {
                this.logger.debug(`${requestName} contentType is not equal with request option`);
                return null;
            }
        }


        return mockApiEntity;
    }
}
