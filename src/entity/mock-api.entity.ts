import { MockApiResEntity } from "./mock-api-res.entity"

export type HttpMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET' | string

export interface MockApiEntity {
    id: string
    method: HttpMethod
    path: string
    response: MockApiResEntity
}