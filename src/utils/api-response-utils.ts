export namespace ApiResponseUtils {

    const SUCCESS_CODE = "SUCCESS";
    const FAIL_CODE = "FAIL";

    export function createDataSuccess(data: any) {
        return {
            status: SUCCESS_CODE,
            data: data,
            message: 'Data has been added to the system successfully.'
        }
    }

    export function fetchDataSuccess(data: any) {
        return {
            status: SUCCESS_CODE,
            data: data,
            message: 'Fetch data successfully.'
        }
    }

    export function updateDataSuccess(data: any) {
        return {
            status: SUCCESS_CODE,
            data: data,
            message: 'Data has been updated to the system successfully.'
        }
    }

    export function removeDataSuccess(data: any) {
        return {
            status: SUCCESS_CODE,
            data: data,
            message: 'Data has been deleted to the system successfully.'
        }
    }

    export function actionFail(data: any, message: string) {
        return {
            status: FAIL_CODE,
            data: data,
            message: message
        }
    }
}