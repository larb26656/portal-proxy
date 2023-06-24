export namespace JsonUtils {
    export function compare(a: any, b: any) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}