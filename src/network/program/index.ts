import instance from "@/network/index";

import {
    IProgramCommentType,
    IProgramDetailType
} from "./types";

/* 
必选参数 : id: 电台节目的 id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
接口地址 : /comment/dj
*/
// 获取电台节目评论
export function getProgramComment(query: any) {
    return instance.get<IProgramCommentType>({
        url: "/comment/dj",
        params: {
            limit: 20,
            offset: 0,
            ...query
        }
    })
}

// 获取电台详情
export function getProgramDetail(id: number) {
    return instance.get<IProgramDetailType>({
        url: "/dj/program/detail",
        params: {
            id
        }
    })
}