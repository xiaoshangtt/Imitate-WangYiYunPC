export function toWan(num: number, toFixedNum = 1) {
    let toAfterNum = "";
    if (num > 10000 * 10000) {
        toAfterNum = String((num / (10000 * 10000)).toFixed(1)) + "亿";
    } else if (num > 10000) {
        toAfterNum = String((num / 10000).toFixed(toFixedNum)) + "万";
    } else {
        toAfterNum = String(num);
    }
    return toAfterNum;
}