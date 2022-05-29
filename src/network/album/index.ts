import instance from "@/network/index";

import {
    IAlbumContentType,
    IAlbumCommentType
} from "./types";

// 获取专辑内容
export function getAlbumContent(id: number) {
    return instance.get<IAlbumContentType>({
        url: "/album",
        params: {
            id
        }
    })
}
// 获取专辑评论
export function getAlbumComment(query: any) {
    return instance.get<IAlbumCommentType>({
        url: "/comment/album",
        params: {
            limit: 20,
            offset: 0,
            ...query
        }
    })
}