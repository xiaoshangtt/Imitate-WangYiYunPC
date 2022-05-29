import { Module } from "vuex";

import { IProgramState } from "./types";
import { IRootState } from "@/store/types";

import {
    getProgramDetail,
    getProgramComment
} from "@/network/program";

export const ProgramModule: Module<IProgramState, IRootState> = {
    namespaced: true,
    state() {
        return {
            programDetail: {},
            programComment: {},
        }
    },
    mutations: {
        mu_changeProgramDetail(state, programDetail) {
            state.programDetail = programDetail;
        },
        mu_changeProgramComment(state, programComment) {
            state.programComment = programComment;
        }
    },
    actions: {
        async ac_getProgramDetail(context, id) {
            const programDetail = await getProgramDetail(id);
            context.commit("mu_changeProgramDetail", programDetail.data?.program || []);
        },
        async ac_getProgramComment(context, query) {
            const programComment = await getProgramComment(query);
            context.commit("mu_changeProgramComment", programComment.data);
        }
    }
}