import create from "zustand";
import { devtools } from "zustand/middleware";

export type StoreType = {};

export const useStore = create<StoreType>(
    devtools((set, get) => ({
        planetsDate: [],
        peopleData: [],
        speciesData: [],
        api: {},
    }))
);
