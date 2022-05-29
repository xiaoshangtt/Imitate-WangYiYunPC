import instance from "@/network";
// import axios from "axios";

// const CancelToken = axios.CancelToken;
// let source: any = null;

// let req: any = null;

// // 获取音乐的请求
// export function getMusicBufferData(config: any) {
//     if (req) {
//         source.cancel()
//         req = null;
//     }
//     // 每次请求获取新的签名，在下次请求开始时，取消调上一次请求
//     source = CancelToken.source()
//     req = instance.get({
//         cancelToken: source.token,
//         ...config
//     })
//     return req;
// }
