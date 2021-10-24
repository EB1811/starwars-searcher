import { GetState, SetState, StateCreator, StoreApi } from "zustand";

export interface PlanetNamesSlice {
    readonly planetNames: string[];
    getPlanetNames: () => Promise<void>;
    setPlanetNames: (data: string[]) => void;
}

const createPlanetNamesSlice:
    | StateCreator<PlanetNamesSlice>
    | StoreApi<PlanetNamesSlice> = (set, get) => ({
    planetNames: [],
    getPlanetNames: async () => {
        const planetsData = await (
            await fetch("https://swapi.dev/api/planets")
        ).json();

        set({
            planetNames: planetsData.results.map((pd: any) => pd.name),
        });
    },
    setPlanetNames: (data: string[]) => {
        set({ planetNames: data });
    },
});

export default createPlanetNamesSlice as (
    set: SetState<PlanetNamesSlice>,
    get: GetState<PlanetNamesSlice>,
    api: StoreApi<PlanetNamesSlice>
) => PlanetNamesSlice;
