import instance from "@/network/index";

import { ISongDetailInfoType, ILyricType, ISimiSongType } from "./types";

// 获取歌曲详情     id
export function getSongDetailInfo(ids: string) {
    return instance.get<ISongDetailInfoType>({
        url: "/song/detail",
        params: {
            ids
        }
    })
}

// 获取歌曲评论     id
export function getSongComment(query: any) {
    return instance.get({
        url: "/comment/music",
        params: {
            limit: 20,
            offset: 0,
            ...query
        }
    })
}

// 获取歌词     id
export function getLyric(id: number) {
    return instance.get<ILyricType>({
        url: "/lyric",
        params: {
            id
        }
    })
}

// 获取相似歌曲     歌曲 id
export function getSimiSong(id: number) {
    return instance.get<ISimiSongType>({
        url: "/simi/song",
        params: {
            id
        }
    })
}