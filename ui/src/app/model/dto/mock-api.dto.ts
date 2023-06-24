import { MockApiReqDto } from "./mock-api-req.dto"
import { MockApiResDto } from "./mock-api-res.dto"

export interface MockApiDto {
    id?: string
    request: MockApiReqDto
    response: MockApiResDto
}

export function createDefaultMockApiDto(): MockApiDto {
    return {
        request: {
          method: 'GET',
          path: '',
          isStrictContentType: false,
          isStrictBody: false
        },
        response: {
          delayInSec: 1,
          statusCode: 200,
          contentType: 'application/json'
        },
    } as MockApiDto;
}