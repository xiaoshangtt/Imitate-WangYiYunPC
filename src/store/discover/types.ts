export interface IDiscoverState {
  bannerList: any[];
  dayRecommendList: any[];
  newSongList: any[];
  categorySongList: any[];
  categorySongListTotal: number;

  recommendArtist: any[];

  toplistPopular: any[];

  hotPlaylistList: any[];
  allPlaylistCategoryList: any[];

  toplist: any[];
  toplistDetail: any[];
  toplistComment: {
    comments: any[],
    more: boolean;
    total: number
  };
  threeToplist: any[];

  djCategory: any[]
  djCategoryRecommend: any[];
  djToplist: any;

  djRecommend: {
    djMusicRecommend: any,
    djLifeRecommend: any,
    djEmotionRecommend: any,
    djCreateCoverRecommend: any,
    djKnowledgeRecommend: any
  },
  recommendProgram: any[];
  programToplist: any[];
  artistList: any[];
  hotArtistList: any[];

  allAlbum: any[];
  allAlbumTotal: number;
  newAlbumWeekData: any[];

  [key: string]: any;
}