import { Module } from "vuex";

import { ISearchState } from "./types";
import { IRootState } from "../types";

import {
    getSearchResult,
    getSearchSuggest
} from "@/network/search";

export const SearchModule: Module<ISearchState, IRootState> = {
    namespaced: true,
    state() {
        return {
            searchResult: {},
            searchSuggest: {}
        }
    },
    mutations: {
        mu_changeSearchResult(state, searchResult) {
            state.searchResult = searchResult;
        },
        mu_changeSearchSuggest(state, searchSuggest) {
            state.searchSuggest = searchSuggest;
        }
    },
    actions: {
        async ac_getSearchResult({ commit, state }, query) {
            state.searchResult = {};
            const searchResult = await getSearchResult(query);
            commit("mu_changeSearchResult", searchResult.data.result);
        },
        async ac_getSearchSuggest({ commit, state }, query) {
            state.searchSuggest = {};
            const searchSuggest = await getSearchSuggest(query);
            commit("mu_changeSearchSuggest", searchSuggest.data.result);
        }
    }
}