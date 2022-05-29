import { Module } from "vuex";

import { IArtistState } from "./types";
import { IRootState } from "@/store/types";

import {
    getArtistAlbum,
    getArtistDetail,
    getArtistHot50Song,
    getArtistDesc,
    getArtistMv,
    getSimiArtist
} from "@/network/artist";

export const ArtistModule: Module<IArtistState, IRootState> = {
    namespaced: true,
    state() {
        return {
            // 歌手详情数据
            artistDetail: {},
            // 歌手热门50首歌曲
            artistHot50Song: [],
            // 歌手专辑
            artistAlbum: {},
            // 歌手描述
            artistDesc: {},
            // 歌手MV
            artistMv: [],
            // 相似歌手
            simiArtist: []
        }
    },
    mutations: {
        // 修改歌手详情
        mu_changeArtistDetail(state, artistDetail) {
            state.artistDetail = artistDetail;
        },
        // 修改歌手热门50首歌曲
        mu_changeArtistHot50Song(state, artistHot50Song) {
            state.artistHot50Song = artistHot50Song;
        },
        // 修改歌手专辑
        mu_changeArtistAlbum(state, artistAlbum) {
            state.artistAlbum = artistAlbum;
        },
        // 修改歌手歌手描述
        mu_changeArtistDesc(state, artistDesc) {
            state.artistDesc = artistDesc;
        },
        // 修改歌手MV
        mu_changeArtistMv(state, artistMv) {
            state.artistMv = artistMv;
        },
        // 修改相似歌手
        mu_changeSimiArtist(state, simiArtist) {
            state.simiArtist = simiArtist;
        }
    },
    actions: {
        // // 获取歌手详情，在歌手专辑的artist字段中函数歌手简介，并且含有alias别称列表，而这个没有别称列表
        async ac_getArtistDetail(context, id) {
            const artistDetail = await getArtistDetail(id);
            context.commit("mu_changeArtistDetail", artistDetail.data?.data || {});
        },
        // 获取歌手热门50首歌曲
        async ac_getArtistHot50Song(context, id) {
            const artistDetail = await getArtistHot50Song(id);
            context.commit("mu_changeArtistHot50Song", artistDetail.data.songs);
        },
        // 获取歌手专辑, 其中包含artist字段含有歌手的信息，含有alias歌手的别称数组，而歌手详情中没有alias字段
        async ac_getArtistAlbum(context, query) {
            const artistAlbum = await getArtistAlbum(query);
            console.log(artistAlbum.data);
            context.commit("mu_changeArtistAlbum", artistAlbum.data);
        },
        // 获取歌手描述
        async ac_getArtistDesc(context, id) {
            const artistDesc = await getArtistDesc(id);
            context.commit("mu_changeArtistDesc", artistDesc.data);
        },
        // 获取歌手MV
        async ac_getArtistMv(context, id) {
            const artistMv = await getArtistMv(id);
            context.commit("mu_changeArtistMv", artistMv.data.mvs);
        },
        // 获取相似歌手
        async ac_getSimiArtist(cotnext, id) {
            const simiArtist = await getSimiArtist(id);
            console.log(simiArtist.data)
            cotnext.commit("mu_changeSimiArtist", simiArtist.data.artists);
        }
    }
}