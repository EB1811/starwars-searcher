import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
    devtools((set, get) => ({
        planetsDate: [],
        peopleData: [],
        speciesData: [],
    }))
);
