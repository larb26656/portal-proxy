import { MockApiResDto } from "./mock-api-res.dto"

export type HttpMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET' | string

export interface MockApiDto {
    method: HttpMethod
    path: string
    response: MockApiResDto
}