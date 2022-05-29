export interface ISongDetailInfoType {
    code: number;
    songs: any[];
    privileges: any[];
}

export interface ILyricType {
    code: number;
    lrc: any;
    needDesc: boolean;
    qfy: boolean;
    sfy: boolean;
    sgc: boolean
}
export interface ISimiSongType {
    songs: any[];
    code: number;
}