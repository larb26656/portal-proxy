export interface MockApiReqEntity {
    name: string;
    method: string
    path: string
    description?: string
    isStrictContentType: boolean
    contentType?: string
    isStrictBody: boolean
    body?: string
}