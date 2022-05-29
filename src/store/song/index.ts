import { Module } from "vuex";

import { ISongType } from "./types";
import { IRootState } from "../types";

import { getSongDetailInfo, getSongComment, getLyric, getSimiSong } from "@/network/song";

export const songModule: Module<ISongType, IRootState> = {
    namespaced: true,
    state() {
        return {
            songDetailInfo: {},
            songComment: {},
            lyric: {},
            simiSong: []
        }
    },
    mutations: {
        mu_changeSongDetailInfo(state, songDetailInfo) {
            state.songDetailInfo = songDetailInfo;
        },
        mu_changeSongComment(state, songComment) {
            state.songComment = songComment;
        },
        mu_changeLyric(state, lyric) {
            state.lyric = lyric;
        },
        mu_changeSimiSong(state, simiSong) {
            state.simiSong = simiSong;
        }
    },
    actions: {
        async ac_getSongDetailInfo(context, ids) {
            const songDetailInfo = await getSongDetailInfo(ids);
            context.commit("mu_changeSongDetailInfo", songDetailInfo.data.songs[0]);
        },
        async ac_getSongComment(context, query) {
            const songComment = await getSongComment(query);
            context.commit("mu_changeSongComment", songComment.data);
        },
        async ac_getLyric(context, id) {
            const lyric = await getLyric(id);
            const reg = /(\[[\d:.]+\])/g;
            let rmat = lyric.data.lrc.lyric.match(reg);
            while (rmat) {
                lyric.data.lrc.lyric = lyric.data.lrc.lyric.replace(rmat[0], "")
                rmat = lyric.data.lrc.lyric.match(reg);
            }
            context.commit("mu_changeLyric", lyric.data.lrc);
        },
        async getSimiSong(context, id) {
            const simiSong = await getSimiSong(id);
            context.commit("mu_changeSimiSong", simiSong.data.songs);
        }
    }
}