export function toMinutes(seconds: number) {
    const Minutes = parseInt(String(seconds / 60));
    const second = parseInt(String((seconds % 60)));
    return `${String(Minutes).length == 1 ? "0" + Minutes : Minutes}:${String(second).length == 1 ? "0" + second : second}`;
}