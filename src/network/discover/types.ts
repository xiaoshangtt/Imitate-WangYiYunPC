import {AxiosResponse} from "axios";

export interface IBannerListType extends AxiosResponse {
  code: number;
  banners: any[];
};

export interface IDayRecommendType extends AxiosResponse {
  code: number;
  hasTaste: string;
  category: number;
  result: any[];
};

export interface INewSongType extends AxiosResponse {
  code: number,
  category: number,
  result: any[]
};

export interface IRecommendMV extends AxiosResponse {
  code: number;
  category: number;
  result: any[];
}

export interface ITopList extends AxiosResponse {
  code: number,
  list: any[],
  artistToplist: any
}

export interface IPlaylistDetail {
  code: number;
  playlist: {
    id: number;
    name: string;
    tracks: any[];
  }
  privileges: any;
}

export interface IAllPlaylistCategoryListType {
  code: number;
  all: any;
  sub: any[];
  categories: any;
}

export interface IDjCategoryType {
  categories: any[];
  code: number;
}

export interface IDjCategoryRecommendType {
  code: number;
  hasMore: boolean;
  djRadios: any[];
}

export interface IDjHotToplistType {
  code: number;
  djRadios: any[];
  count: number;
  hasMore: boolean;
}

export interface IRecommendProgramType {
  code: number;
  programs: any[];
  name: string;
  more: boolean;
}

export interface IProgramToplistType {
  updateTime: number;
  toplist: any[];
  code: number;
}

export interface IArtistListType {
  artists: any[];
  more: boolean;
  code: number;
}

export interface IHotArtistListType {
  artists: any[];
  more: boolean;
  code: number;
}

export interface IAllAlbumType {
  albums: any[];
  total: number;
  code: number;
}

export interface INewAlbumType {
  weekData: any[];
  hasMore: boolean;
  monthData: any[];
  code: number;
}

export interface IToplistPopularType {
  code: number;
  data: {
    total: number;
    updateTime: number;
    list: any[];
  }
}