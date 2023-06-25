export namespace CurlUtils {
    export function removeLineBreak(curl: string) {
        return curl.replaceAll('\' \\', '\'');
    }
}