export function saveLocal(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocal(key: string) {
    const value = window.localStorage.getItem(key) || '';
    try {
        return JSON.parse(value);
    } catch {
        return value
    }
}