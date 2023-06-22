import { HttpException, HttpStatus } from "@nestjs/common";

export class MockApiNotFoundException extends HttpException {

    constructor(id: string) {
        super(`Mock api id [${id}] not found.`, HttpStatus.BAD_REQUEST);
    }

}