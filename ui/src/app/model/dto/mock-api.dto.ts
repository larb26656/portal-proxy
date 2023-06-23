import { MockApiResDto } from "./mock-api-res.dto"

export interface MockApiDto {
    id?: string
    method?: string
    path?: string
    description?: string
    response: MockApiResDto
}