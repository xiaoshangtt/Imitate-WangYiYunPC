import { Module } from "vuex";

import { IUserType } from "./types";
import { IRootState } from "../types";

import {
    getUserCreatePlaylist,
    getUserDetail,
    getUserRecord,
    getUserFans,
    getUserFollows,
    getUserEvent
} from "@/network/user/index";

export const UserModule: Module<IUserType, IRootState> = {
    namespaced: true,
    state() {
        return {
            userPlaylist: {
                storePlaylist: [],
                createPlaylist: []
            },
            userPlaylistMore: true,
            userDetail: {},
            userRecord: {
                weekData: [],
                allData: []
            },
            userFans: {
                followeds: [],
            },
            userFollows: {
                follow: [],
                more: true
            },
            userEvent: {
                events: [],
                more: true,
                size: 0,
                lasttime: null
            }
        }
    },
    getters: {
        g_nickName(state, getters) {
            return state?.userDetail?.profile?.nickname || "";
        },
        g_playlistCount(state, getters) {
            return {
                storePlaylistCount: state.userPlaylist.storePlaylist?.length || 0,
                createPlaylistCount: state.userPlaylist.createPlaylist?.length || 0
            }
        },
        g_peopleCanSeeMyPlayRecord(state, getters) {
            return state?.userDetail?.peopleCanSeeMyPlayRecord;
        }
    },
    mutations: {
        mu_changeUserPlaylist(state, payload) {
            const uid = payload.uid;
            const playlist: any = {
                storePlaylist: [],
                createPlaylist: []
            }
            payload.userPlaylist.forEach((song: any) => {
                if (song.creator.userId == uid) {
                    playlist.createPlaylist.push(song);
                } else {
                    playlist.storePlaylist.push(song);
                }
            })
            state.userPlaylist = playlist;

            // state.userPlaylist.storePlaylist.push(...payload.userPlaylist);
            // state.userPlaylist.createPlaylist.push(...payload.userPlaylist);
            state.userPlaylistMore = payload.more;
        },
        mu_changeUserDetail(state, userDetail) {
            state.userDetail = userDetail;
        },
        mu_changeUserRecord(state, payload) {
            if (payload.type == 1) {
                state.userRecord.weekData = payload.data;
            } else if (payload.type == 0) {
                state.userRecord.allData = payload.data;
            }
        },
        mu_changeUserFans(state, userFans) {
            state.userFans = userFans;
        },
        mu_changeUserFollows(state, userFollows) {
            state.userFollows = userFollows;
        },
        mu_changeUserEvent(state, userEvent) {
            state.userEvent.events.push(...userEvent.events);
            state.userEvent.more = userEvent.more;
            state.userEvent.lasttime = userEvent.lasttime;
            state.userEvent.size = userEvent.size;
        },
        mu_clearUserInfo(state) {
            state.userPlaylist = {
                storePlaylist: [],
                createPlaylist: []
            };
            state.userPlaylistMore = true;
            state.userDetail = {};
            state.userFans = {
                followeds: [],
            };
            state.userFollows = {
                follow: [],
                more: true
            };
            state.userEvent = {
                events: [],
                more: true,
                size: 0,
                lasttime: null
            }
        },
    },
    actions: {
        //  获取用户的歌单列表(包含创建以及收藏) 
        async ac_getUserPlaylist(context, query) {
            if (context.state.userPlaylistMore) {
                const userPlaylist = await getUserCreatePlaylist(query);
                context.commit("mu_changeUserPlaylist",
                    {
                        userPlaylist: userPlaylist.data.playlist || [],
                        more: userPlaylist.data.more,
                        uid: userPlaylist.config.params.uid
                    });
                console.log(userPlaylist)
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        },
        // 获取用户的详情信息
        async ac_getUserDetail(context, uid) {
            const userDetail = await getUserDetail(uid);
            context.commit("mu_changeUserDetail", userDetail.data);
        },
        // 获取用户听过的歌曲
        async ac_getUserRecord(context, query) {
            let data;
            if (query.type == 1 && context.state.userRecord?.weekData?.length == 0) {
                data = (await getUserRecord(query)).data.weekData;
                context.commit("mu_changeUserRecord", { type: query.type, data });
            } else if (query.type == 0 && context.state.userRecord?.allData?.length == 0) {
                data = (await getUserRecord(query)).data.allData;
                context.commit("mu_changeUserRecord", { type: query.type, data });
            }
        },
        // 获取用户的粉丝列表
        async ac_getUserFans(context, query) {
            const UserFans = await getUserFans(query);
            context.commit("mu_changeUserFans", UserFans.data);
        },
        // 获取用户的关注列表
        async ac_getUserFollows(context, query) {
            const UserFollows = await getUserFollows(query);
            context.commit("mu_changeUserFollows", UserFollows.data);
        },
        async ac_getUserEvent(context, query) {
            const lasttime = context.state.userEvent.lasttime || -1;
            const UserEvent = await getUserEvent({
                lasttime: lasttime,
                ...query
            });
            context.commit("mu_changeUserEvent", UserEvent.data);
            return Promise.resolve(true);
        }
    }
}