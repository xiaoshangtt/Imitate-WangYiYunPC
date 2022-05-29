export function changeStr(str: string, spstr: string) {
    const result = str.match(new RegExp(spstr, "g"));
    if (result) {
        str = str.replace(
            result[0],
            `<span class='suggest'>${result[0]}</span>`
        );
    }
    return str;
};