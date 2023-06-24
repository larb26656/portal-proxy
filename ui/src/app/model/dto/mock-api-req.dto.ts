export interface MockApiReqDto {
    method: string
    path: string
    description?: string
    isStrictContentType: boolean
    contentType?: string
    isStrictBody: boolean
    body?: string
}