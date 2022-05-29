import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IStoreType, IRootState } from "@/store/types";

import { discoverModule } from "./discover/index"
import { playlistModule } from "./playlist/index";
import { songModule } from "./song/index";
import { UserModule } from "./user";
import { ArtistModule } from "./artist";
import { AlbumModule } from "./album";
import { ProgramModule } from "./program";
import { DjradioModule } from "./djradio";
import { SearchModule } from "./search";
import { MusiclistModule } from "./musiclist";



const store = createStore<IRootState>({
    state() {
        return {}
    },
    mutations: {},
    actions: {},
    modules: {
        discover: discoverModule,
        playlist: playlistModule,
        song: songModule,
        user: UserModule,
        artist: ArtistModule,
        album: AlbumModule,
        program: ProgramModule,
        djradio: DjradioModule,
        search: SearchModule,
        musiclist: MusiclistModule
    }
})

export function useStore(): Store<IStoreType> {
    return useVuexStore();
}

export default store;