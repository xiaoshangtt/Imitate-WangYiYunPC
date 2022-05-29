import instance from "@/network";

import {
    IUserCreatePlaylistType,
    IUserDetailType,
    IUserRecordType,
    IUserFansType,
    IUserFollowsType,
    IUserEventType
} from "./types";

// 获取用户数据

// 获取用户的歌单列表(包含创建以及收藏)       uid
export function getUserCreatePlaylist(query: any) {
    return instance.get<IUserCreatePlaylistType>({
        url: "/user/playlist",
        params: {
            limit: 30,
            offset: 0,
            ...query
        }
    })
}

// 获取用户详情
export function getUserDetail(uid: number) {
    return instance.get<IUserDetailType>({
        url: "/user/detail",
        params: {
            uid
        }
    })
}

// 获取用户播放记录     uid type=1 weekData type=0 allData          default = 0
export function getUserRecord(query: { uid: number, type: 0 | 1 }) {
    return instance.get<IUserRecordType>({
        url: "/user/record",
        params: query
    })
}


// 获取用户的粉丝 uid
export function getUserFans(query: any) {
    return instance.get<IUserFansType>({
        url: "/user/followeds",
        params: {
            limit: 30,
            offset: 0,
            ...query
        }
    })
}

// 获取用户的关注列表 uid
export function getUserFollows(query: any) {
    return instance.get<IUserFollowsType>({
        url: "/user/follows",
        params: {
            limit: 30,
            offset: 0,
            ...query
        }
    })
}

/* 
必选参数 : uid : 用户 id
可选参数 : limit : 返回数量 , 默认为 30
lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
*/

// 获取用户动态 uid
export function getUserEvent(query: any) {
    return instance.get<IUserEventType>({
        url: "/user/event",
        params: {
            limit: 30,
            lasttime: -1,
            ...query
        }
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
// /user/subcount