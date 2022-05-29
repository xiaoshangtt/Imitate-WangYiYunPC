import instance from "@/network/index";

import {
  IBannerListType,
  IDayRecommendType,
  INewSongType,
  IRecommendMV,
  ITopList,
  IPlaylistDetail,
  IAllPlaylistCategoryListType,
  IDjCategoryType,
  IDjCategoryRecommendType,
  IDjHotToplistType,
  IRecommendProgramType,
  IProgramToplistType,
  IArtistListType,
  IHotArtistListType,
  IAllAlbumType,
  INewAlbumType,
  IToplistPopularType
} from "@/network/discover/types"

// 轮播图
export function getBanner() {
  return instance.get<IBannerListType>({
    url: "/banner"
  });
};

// 每日推荐
export function getDayRecommend(limit = 10) {
  return instance.get<IDayRecommendType>({
    url: "/personalized",
    params: {
      limit: limit
    }
  });
};

// 新歌
export function getNewSong(limit = 10) {
  return instance.get<INewSongType>({
    url: "/personalized/newsong",
    params: {
      limit: limit
    }
  })
}

// 推荐MV
export function getRecommendMV() {
  return instance.get<IRecommendMV>({
    url: "/personalized/mv",
  })
}

// 获取全部排行榜
export function getToplist() {
  return instance.get<ITopList>({
    url: "/toplist"
  })
}

// 歌单详情，可以获取排行榜的歌曲
export function getPlaylistDetail(id: number) {
  return instance.get<IPlaylistDetail>({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}


// 歌单 ( 网友精选碟 )
export function getPlaylistDetailNetFriend(query: any) {
  return instance.get({
    url: "/top/playlist",
    params: {
      limit: 35,
      offset: 0,
      ...query
    }
  })
}

// 获取所有的分类
export function getAllPlaylistCategory() {
  return instance.get<IAllPlaylistCategoryListType>({
    url: "/playlist/catlist"
  })
}


// 获取电台（dj）分类
export function getDjCatelist() {
  return instance.get<IDjCategoryType>({
    url: "/dj/catelist"
  })
}

// 获取电台（dj）分类推荐
export function getDjCategoryRecomment(type: number) {
  return instance.get<IDjCategoryRecommendType>({
    url: "/dj/recommend/type",
    params: {
      type
    }
  })
}

// 获取电台排行榜   新晋电台榜/热门电台榜
export function getDjHotToplist(query: any) {
  return instance.get<IDjHotToplistType>({
    url: "/dj/radio/hot",
    params: {
      limit: 20,
      offset: 0,
      ...query
    }
  })
}

// 获取 djradio中获取推荐节目
export function getRecommendProgram(limit = 50) {
  return instance.get<IRecommendProgramType>({
    url: "/program/recommend",
    params: {
      limit: limit
    }
  })
}

// 获取 djradio中节目榜
export function getProgramToplist(query: any) {
  return instance.get<IProgramToplistType>({
    url: "/dj/program/toplist",
    params: {
      limit: 100,
      offset: 0,
      ...query
    }
  })
}


/* 
limit : 返回数量 , 默认为 30

offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0

type 取值:

-1:全部
1:男歌手
2:女歌手
3:乐队
area 取值:

-1:全部
7华语
96欧美
8:日本
16韩国
0:其他
*/
// 获取歌手分类列表
// /artist/list
export function getArtistList(query: any) {
  return instance.get<IArtistListType>({
    url: "/artist/list",
    params: {
      limit: 100,
      offset: 0,
      type: -1,
      area: -1,
      ...query
    }
  })
}

// 获取热门歌手
export function getHotArtistList(query: any) {
  return instance.get<IHotArtistListType>({
    url: "/top/artists",
    params: {
      limit: 100,
      offset: 0,
      ...query
    }
  })
}

// 获取全部新碟
/* 
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
/album/new
*/

export function getAllAlbum(query: any) {
  return instance.get<IAllAlbumType>({
    url: "/album/new",
    params: {
      limit: 40,
      offset: 0,
      area: "All",
      ...query
    }
  })
}

// 获取新碟上架的热门新碟
/* 
可选参数 :

limit: 取出数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
type : new:全部 hot:热门,默认为 new
year : 年,默认本年
month : 月,默认本月
接口地址 : /top/album
*/
export function getNewAlbum(query?: any) {
  return instance.get<INewAlbumType>({
    url: "/top/album",
    params: {
      limit: 50,
      offset: 0,
      area: "ALL",
      type: "hot",
      ...query
    }
  })
}

// 获取最热主播榜
// 只有limit参数，暂不支持offset
export function getToplistPopular(query: any) {
  return instance.get<IToplistPopularType>({
    url: "/dj/toplist/popular",
    params: {
      limit: 100,
      ...query
    }
  })
}