export namespace UrlUtils {

    export function extractPathFromURL(url: string): string {
        const urlObj = new URL(url);
        let path = urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
        
        if (path.startsWith('/')) {
            path = path.slice(1);
        }
        
        return path;
    }

}