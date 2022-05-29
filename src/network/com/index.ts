import instance from "@/network/index";

import {
  IHotPlaylistType,
  IPlaylistCommentType,
  IArtistDetail,
  ISongUrlType
} from "./types";

// 获取热门歌单
export function getHotPlaylist(query: any) {
  return instance.get<IHotPlaylistType>({
    url: "top/playlist",
    params: {
      limit: 35,
      offset: 0,
      ...query
    }
  })
}

// 获取音乐url      id
/* 
必选参数 : id : 音乐 id
可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
*/
export function getSongUrl(id: number) {
  return instance.get<ISongUrlType>({
    url: "/song/url",
    params: {
      id
    }
  })
}

// 歌单评论 id limit offset  before(分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到))
export function getPlaylistComment(query: any) {
  return instance.get<IPlaylistCommentType>({
    url: "/comment/playlist",
    params: {
      limit: 20,
      offset: 0,
      ...query
    }
  })
}

// 获取歌手详情
export function getArtistDetail(id: number) {
  return instance.get<IArtistDetail>({
    url: "/artist/detail",
    params: {
      id
    }
  })
}