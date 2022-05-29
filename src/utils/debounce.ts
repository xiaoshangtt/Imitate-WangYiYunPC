export function debounce(func: any, delay = 1000, ctx?: any) {
    let timer: number | null = null;
    return (...args: any) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(ctx, args);
        }, delay);
    }
}