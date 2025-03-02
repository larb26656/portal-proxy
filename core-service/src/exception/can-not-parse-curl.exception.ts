import { HttpException, HttpStatus } from "@nestjs/common";

export class CanNotParseCurlException extends HttpException {

    constructor(e) {
        super(`Can't parse curl check you curl text is valid : ${e}`, HttpStatus.BAD_REQUEST);
    }

}