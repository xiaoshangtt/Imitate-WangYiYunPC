// 将指定字符之间的东西进行替换     replaceStr中可以传递(target)来获取匹配出来的值
export function regexpChar(matchChar: string, str: string, replaceStr: string) {
    const allMatch = "[\u4e00-\u9fa5a-zA-Z0-9]";
    const match = new RegExp(`${matchChar}${allMatch}*${matchChar}`, "g");

    const matchResult = str.match(match);
    if (matchResult) {
        matchResult.forEach(item => {
            const st = replaceStr.replace("(target)", item);
            str = str.replace(item, st);
        })
    }
    return str;

}