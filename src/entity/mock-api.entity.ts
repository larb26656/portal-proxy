import { MockApiReqEntity } from "./mock-api-req.entity"
import { MockApiResEntity } from "./mock-api-res.entity"

export interface MockApiEntity {
    id: string
    name: string
    request: MockApiReqEntity
    response: MockApiResEntity
}