export namespace Delay {
    export function mils(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    export function sec(sec: number) {
        return mils(sec * 1000);
    }
}