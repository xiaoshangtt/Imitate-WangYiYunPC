interface DEFAULT_OBJECT {
    [key: string]: number;
}

export function formatDate(format = "YYYY-MM-DD hh:mm:ss", time: string) {
    const date = new Date(time);
    const obj: DEFAULT_OBJECT = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    const yMatch = format.match(/([Yy]+)/g);
    if (yMatch) {
        yMatch.forEach(mati => {
            format = format.replace(mati, String(date.getFullYear()).slice(4 - mati.length));
        })
    }
    for (const k in obj) {
        const reg = `(${k})`;
        const oMatch = new RegExp(reg).exec(format);
        if (oMatch) {
            oMatch.forEach(mati => {
                format = format.replace(mati, mati.length == 1 ? (obj[k] + "") : ("00" + obj[k]).slice(String(obj[k]).length))
            })
        }
    }
    return format;
}