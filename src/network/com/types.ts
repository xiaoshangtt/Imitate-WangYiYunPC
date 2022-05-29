export interface IHotPlaylistType {
  playlists: any[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
}

export interface IPlaylistCommentType {
  code: number;
  comments: any[];
  hotComments: any[];
  topComments: any[];
  isMusician: boolean;
  more: boolean;
  total: number;
  userId: number
}

export interface IArtistDetail {
  code: number;
  message: string;
  data: any;
}
export interface ISongUrlType {
  code: number;
  data: any[];
}