import { IDiscoverState } from "@/store/discover/types";

export interface IRootState {
    [key: string]: any;
}

export interface IRootWithModule {
    discover: IDiscoverState
}

export type IStoreType = IRootState & IRootWithModule;
