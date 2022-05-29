// 使用.env文件以VUE_APP开头的变量，来控制在不同环境下的url
// export const Gloconfig = {
//     baseURL: process.env.VUE_APP_BASE_URL
// }

// 通过process.env.NODE_ENV的值来判断是在什么环境下
let baseURL = "";
if (process.env.NODE_ENV == "development") {
    baseURL = "http://localhost:3000";
} else if (process.env.NODE_ENV == "production") {
    baseURL = "http://api:3600";
} else {
    baseURL = "http://localhost:3000";
}
export const Gloconfig = {
    baseURL: baseURL,
    isLoading: false
}