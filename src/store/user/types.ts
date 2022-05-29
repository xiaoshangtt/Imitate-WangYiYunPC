export interface IUserType {
    userPlaylist: { storePlaylist: any[], createPlaylist: any[] };
    userPlaylistMore: boolean;
    userDetail: any;
    userRecord: { weekData: any[], allData: any[] };
    userFans: { followeds: any[] };
    userFollows: { follow: any[], more: boolean }
    userEvent: {
        events: any[],
        more: boolean,
        size: number,
        lasttime: number | null
    }
}