import instance from "@/network";

import {
    IArtistDetailType,
    IArtistHot50SongType,
    IArtistAlbumType,
    IArtistDescType,
    IArtistMvType,
    ISimiArtistType
} from "./types";

// 获取歌手详情
export function getArtistDetail(id: number) {
    return instance.get<IArtistDetailType>({
        url: "/artist/detail",
        params: {
            id
        }
    })
}

// 歌手热门50首歌曲
export function getArtistHot50Song(id: number) {
    return instance.get<IArtistHot50SongType>({
        url: "/artist/top/song",
        params: {
            id
        }
    })
}
// 获取歌手专辑
export function getArtistAlbum(query: any) {
    return instance.get<IArtistAlbumType>({
        url: "/artist/album",
        params: {
            limit: 12,
            offset: 0,
            ...query
        }
    })
}
// 获取歌手描述
export function getArtistDesc(id: number) {
    return instance.get<IArtistDescType>({
        url: "/artist/desc",
        params: {
            id
        }
    })
}

// 获取歌手MV
export function getArtistMv(id: number) {
    return instance.get<IArtistMvType>({
        url: "/artist/mv",
        params: {
            id
        }
    })
}
// 获取相似歌手
export function getSimiArtist(id: number) {
    return instance.get<ISimiArtistType>({
        url: "/simi/artist",
        params: {
            id
        }
    })
}