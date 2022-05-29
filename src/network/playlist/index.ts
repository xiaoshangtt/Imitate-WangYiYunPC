import instance from "@/network/index";

import { IPlaylistTrackAllType, IPlaylistDetailInfoType } from "./types";


// 未使用
// 获取歌单的歌曲， 传 id   
export function getPlaylistTrackAll(query: any) {
    return instance.get<IPlaylistTrackAllType>({
        url: "/playlist/track/all",
        params: {
            limit: 10,
            offset: 0,
            ...query
        }
    })
}

// 获取歌曲的名称以及一些信息 传 id
export function getPlaylistDetailInfo(query: any) {
    return instance.get<IPlaylistDetailInfoType>({
        url: "/playlist/detail",
        params: {
            s: 8,
            ...query
        }
    })
}

// 未使用
// 获取歌曲详情，可以传入多个id，使用,隔开（dt为歌曲时长）
export function getSongDetail(ids: string) {
    return instance.get({
        url: "/song/detail",
        params: {
            ids
        }
    })
}

