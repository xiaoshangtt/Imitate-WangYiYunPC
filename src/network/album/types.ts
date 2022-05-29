export interface IAlbumContentType {
    code: number;
    songs: any[];
    album: any[];
    resourceStaet: boolean;
}

export interface IAlbumCommentType {
    code: number;
    total: number;
    comments: any[];
    hotComments: any[];
    topComments: any[];
    userId: number;
    cnum: 0;
    isMusician: boolean;
    moreHot: boolean;
    commentBanner: null;
}