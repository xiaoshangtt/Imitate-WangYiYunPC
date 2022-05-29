export interface IArtistDetailType {
    code: number;
    message: string;
    data: any;
}

export interface IArtistHot50SongType {
    code: number;
    more: boolean;
    songs: any[];
}
export interface IArtistAlbumType {
    code: number;
    more: boolean;
    hotAlbums: any[];
    artist: any;
}
export interface IArtistDescType {
    code: number;
    count: 4;
    topicData: any[];
    briefDesc: string;
    introduction: any[];
}
export interface IArtistMvType {
    code: number;
    hasMore: boolean;
    time: number;
    mvs: any[];
}
export interface ISimiArtistType {
    code: number;
    artists: any[];
}