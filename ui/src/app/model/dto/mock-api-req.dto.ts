export interface MockApiReqDto {
    method: string
    path: string
    description?: string
    contentType: string
    isHasBody?: boolean
    body?: string
}