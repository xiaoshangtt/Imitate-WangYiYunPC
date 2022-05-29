import { Module } from "vuex";

import { IAlbumState } from './types';
import { IRootState } from "@/store/types";

import {
    getAlbumContent,
    getAlbumComment
} from "@/network/album";

export const AlbumModule: Module<IAlbumState, IRootState> = {
    namespaced: true,
    state() {
        return {
            albumContent: {},
            albumComment: {
                total: 0,
                hotComments: [],
                comments: []
            }
        }
    },
    mutations: {
        mu_changeAlbumContent(state, albumContent) {
            state.albumContent = albumContent;
        },
        mu_changeAlbumComment(state, albumComment) {
            state.albumComment = {
                total: albumComment.total,
                hotComments: albumComment.hotComments,
                comments: albumComment.comments
            }
        }
    },
    actions: {
        async ac_getAlbumContent(context, id) {
            const albumContentResult = await getAlbumContent(id);
            console.log(albumContentResult.data)
            context.commit("mu_changeAlbumContent", albumContentResult.data)
        },
        async ac_getAlbumComment(context, query) {
            const albumCommentResult = await getAlbumComment(query);
            context.commit("mu_changeAlbumComment", albumCommentResult.data);
        }
    }
}