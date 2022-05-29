export function throttle(func: () => any, delay = 300, ctx: any) {
    let last = 0;
    return function (...args: any) {
        const now = new Date().getTime();
        if (now - last > delay) {
            func.apply(ctx, args);
            last = new Date().getTime();
        }
    }
}