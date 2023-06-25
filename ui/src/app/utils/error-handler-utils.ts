import { HttpErrorResponse } from '@angular/common/http';

export namespace ErrorHandlerUtils {
    export function getMsg(error: any): string {
        let messageTemp = 'Internal error please contact the administrator';

        console.log(error);

        if (error instanceof HttpErrorResponse) {
            const errorBody = error.error;

            messageTemp = errorBody.message
        }

        return messageTemp;
    }
}