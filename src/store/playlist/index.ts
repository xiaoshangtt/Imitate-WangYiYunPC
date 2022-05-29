import { Module } from "vuex";
import { IRootState } from "../types";
import { IPlaylistType } from "./types";

import { getPlaylistDetailInfo } from "@/network/playlist/index";

import { getHotPlaylist, getPlaylistComment } from "@/network/com";

export const playlistModule: Module<IPlaylistType, IRootState> = {
    namespaced: true,
    state() {
        return {
            playlistDetailInfo: {},
            playlistComment: {},
            hotPlaylist: {}
        }
    },
    mutations: {
        mu_changePlaylistDetailInfo(state, playlistDetailInfo) {
            state.playlistDetailInfo = playlistDetailInfo;
        },
        mu_changePlaylistComment(state, playlistComment) {
            state.playlistComment = playlistComment;
        },
        mu_changeHotPlaylist(state, hotPlaylist) {
            state.hotPlaylist = hotPlaylist;
        }
    },
    actions: {
        // 获取歌单的详情信息，包含有tracks歌曲列表
        async ac_getPlaylistDetailInfo(context, query) {
            context.state.playlistDetailInfo = {};
            const playlistDetailInfoResult = await getPlaylistDetailInfo(query);
            // playllist中包含了tracks就是歌曲列表
            context.commit("mu_changePlaylistDetailInfo", playlistDetailInfoResult.data.playlist);
        },
        async ac_getPlaylistComment(context, query) {
            context.state.playlistComment = {};
            const playlistCommentResult = await getPlaylistComment(query);
            context.commit("mu_changePlaylistComment", playlistCommentResult.data)
        },
        async ac_getHotPlaylist(context, query) {
            context.state.hotPlaylist = {};
            const hotPlaylist = await getHotPlaylist(query);
            context.commit("mu_changeHotPlaylist", hotPlaylist.data);
        }
    }
}