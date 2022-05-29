import { Module } from "vuex";

import { IDjradioState } from "./types";
import { IRootState } from "@/store/types";

import {
    getDjradioDetail,
    getDjradioProgram
} from "@/network/djradio";

export const DjradioModule: Module<IDjradioState, IRootState> = {
    namespaced: true,
    state() {
        return {
            djradioDetail: {},
            djradioProgram: {},
        }
    },
    mutations: {
        mu_changeDjradioDetail(state, djradioDetail) {
            state.djradioDetail = djradioDetail;
        },
        mu_changeDjradioProgram(staet, djradioProgram) {
            staet.djradioProgram = djradioProgram;
        }
    },
    actions: {
        async ac_getDjradioDetail(context, rid) {
            const djradioDetail = await getDjradioDetail(rid);
            context.commit("mu_changeDjradioDetail", djradioDetail.data?.data || []);
        },
        async ac_getDjradioProgram(context, query) {
            const djradioProgram = await getDjradioProgram(query);
            context.commit("mu_changeDjradioProgram", djradioProgram.data);
        }
    }
}