export interface IUserCreatePlaylistType {
    version: string;
    more: boolean;
    playlist: any[];
    code: number
}

export interface IUserDetailType {
    code: number;
    level: number,
    listenSongs: number;
    userPoint: any;
    mobileSign: boolean;
    pcSign: boolean;
    profile: any;
    peopleCanSeeMyPlayRecord: boolean;
    bindings: any[];
    adValid: boolean;
    createTime: number;
    createDays: number;
    profileVillageInfo: any;
}
export interface IUserRecordType {
    code: number;
    weekData?: any[];
    allData?: any[];
}
export interface IUserFansType {
    code: number;
    more: boolean;
    followeds: any[];
    size: number;
}
export interface IUserFollowsType {
    code: number;
    follow: any[];
    more: boolean;
}
export interface IUserEventType {
    code: number;
    more: true;
    lasttime: number;
    size: number;
    events: any[]
}