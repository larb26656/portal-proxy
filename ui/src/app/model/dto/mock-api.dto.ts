import { MockApiReqDto } from "./mock-api-req.dto"
import { MockApiResDto } from "./mock-api-res.dto"

export interface MockApiDto {
    id?: string
    request: MockApiReqDto
    response: MockApiResDto
}

export function createDefaultMockApiDto() {
    return {
        request: {
          method: 'GET',
          path: '',
          contentType: 'application/json'
        },
        response: {
          delayInSec: 1,
          statusCode: 200,
          contentType: 'application/json'
        },
    };
}