import { Module } from "vuex";

import { IMusiclistState } from "./types";
import { IRootState } from "../types";

import { getSongUrl } from "@/network/com";
import { getPlaylistTrackAll } from "@/network/playlist";
import { getAlbumContent } from "@/network/album";
import { getArtistHot50Song } from "@/network/artist";
import { musicP, SGLocal } from "@/utils";


export const MusiclistModule: Module<IMusiclistState, IRootState> = {
    namespaced: true,
    state() {
        return {
            musiclist: SGLocal.getLocal("musiclist") || [],
            currentPlayMusicId: SGLocal.getLocal("currentPlayMusicId") || 0
        }
    },
    getters: {
        ge_getCurrentPlayMusic(state, getters) {
            return state.musiclist.find(item => item.id == state.currentPlayMusicId) || {};
        }
    },
    mutations: {
        mu_replaceMusiclist(state, musiclist) {
            state.currentPlayMusicId = musiclist[0].id;
            SGLocal.saveLocal("currentPlayMusicId", musiclist[0].id)
            state.musiclist = [...musiclist];
            SGLocal.saveLocal("musiclist", state.musiclist);
        },
        mu_deleteMusic(state, id) {
            state.musiclist = { ...state.musiclist.filter(item => item.id != id) };
            if (id == state.currentPlayMusicId) {
                state.currentPlayMusicId = state.musiclist[0].id || 0;
                SGLocal.saveLocal("currentPlayMusicId", state.musiclist[0].id || 0)
            }
            SGLocal.saveLocal("musiclist", state.musiclist);
        },
        mu_addMusic(state, musicc) {
            if (!(musicc instanceof Array)) {
                musicc = [musicc];
            }
            musicc.forEach((music: any) => {
                if ((state.musiclist.findIndex(item => item.id == music.id)) == -1) {
                    state.musiclist.push({ ...music })
                    if (state.musiclist.length === 1) {
                        state.currentPlayMusicId = state.musiclist[0].id || 0
                        SGLocal.saveLocal("currentPlayMusicId", state.musiclist[0].id || 0)
                    }
                }
            })
            SGLocal.saveLocal("musiclist", state.musiclist);
        },
        mu_changePlayMusic(state, music) {
            if (state.currentPlayMusicId != music.id) {
                if (state.musiclist.findIndex(item => item.id == music.id) == -1) {
                    state.musiclist.push({ ...music });
                }
                state.currentPlayMusicId = music.id;
                SGLocal.saveLocal("currentPlayMusicId", music.id)
            }
            SGLocal.saveLocal("musiclist", state.musiclist);
        }

    },
    actions: {
        async ac_playMusic(context) {
            const music = context.state.musiclist.find(item => item.id === context.state.currentPlayMusicId);
            if (music) {
                context.dispatch("ac_changePlayMusic", music);
            }
        },
        async ac_changePlayMusic(context, music) {
            context.commit("mu_changePlayMusic", music);
            const urlResult = await getSongUrl(music.id);
            musicP.src = urlResult.data.data[0].url;
        },
        // 歌单替换所有歌曲
        async ac_playlistReplaceMusiclist(context, id) {
            const musiclist = await getPlaylistTrackAll({ id: id });
            context.dispatch("ac_changePlayMusic", musiclist.data.songs[0]);
            context.commit("mu_replaceMusiclist", musiclist.data.songs);
        },
        // 专辑替换所有歌曲
        async ac_albumReplaceMusiclist(context, id) {
            const musiclist = await getAlbumContent(id);
            context.dispatch("ac_changePlayMusic", musiclist.data.songs[0]);
            context.commit("mu_replaceMusiclist", musiclist.data.songs)
        },
        // 添加专辑的所有歌曲
        async ac_albumAddMusiclist(context, id) {
            const musiclist = await getAlbumContent(id);
            console.log(musiclist.data.songs)
            context.commit("mu_addMusic", musiclist.data.songs)
        },
        // 添加歌单的所有歌曲
        async ac_playlistAddMusiclist(context, id) {
            const musiclist = await getPlaylistTrackAll({ id: id });
            context.commit("mu_addMusic", musiclist.data.songs);
        },
        // 将歌手热门作品的歌曲列表替换或添加到播放列表
        async ac_playlistAddOrReplaceMusiclist(context, { type, artistId }) {
            const musiclist = await getArtistHot50Song(artistId)
            const mlist = musiclist.data.songs;
            if (type == "replace") {
                context.commit("mu_replaceMusiclist", mlist);
            } else {
                context.commit("mu_addMusic", mlist)
            }
        }
    }
}