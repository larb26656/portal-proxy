export interface MockApiReqEntity {
    method: string
    path: string
    description?: string
    contentType: string
    isHasBody?: boolean
    body?: string
}