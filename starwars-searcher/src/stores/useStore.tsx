import { devtools } from "zustand/middleware";
import create, { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

export type StoreAPI = {
    populateWithAPI: () => Promise<void>;
    getPlanetsData: () => Promise<void>;
    setPlanetsData: (data: string[]) => void;
};

export type StoreType = {
    readonly infoNamesArr: string[];
    readonly infoDict: any;
    readonly planetNames: string[];
    readonly api: StoreAPI;
};

const immer =
    <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
        config(
            (partial, replace) => {
                const nextState =
                    typeof partial === "function"
                        ? produce(partial as (state: Draft<T>) => T)
                        : (partial as T);
                return set(nextState, replace);
            },
            get,
            api
        );

export const useStore = create<StoreType>(
    devtools(
        immer((set, get) => ({
            infoNamesArr: [],
            infoDict: {},
            planetNames: [],
            api: {
                populateWithAPI: async () => {
                    let tempInfoNamesArr: string[] = [];
                    let tempInfoDict: any = {};

                    const [peopleDataRaw, planetsDataRaw, speciesDataRaw] =
                        await Promise.all([
                            await fetch("https://swapi.dev/api/people"),
                            await fetch("https://swapi.dev/api/planets"),
                            await fetch("https://swapi.dev/api/species"),
                        ]);
                    const [peopleData, planetsData, speciesData] =
                        await Promise.all([
                            await peopleDataRaw.json(),
                            await planetsDataRaw.json(),
                            await speciesDataRaw.json(),
                        ]);

                    peopleData.results.forEach((data: any) => {
                        tempInfoNamesArr.push(data.name);
                        tempInfoDict[data.name] = data;
                    });
                    planetsData.results.forEach((data: any) => {
                        tempInfoNamesArr.push(data.name);
                        tempInfoDict[data.name] = data;
                    });
                    speciesData.results.forEach((data: any) => {
                        tempInfoNamesArr.push(data.name);
                        tempInfoDict[data.name] = data;
                    });

                    set({ infoNamesArr: tempInfoNamesArr });
                    set({ infoDict: tempInfoDict });
                },
                getPlanetsData: async () => {
                    const planetsData = await (
                        await fetch("https://swapi.dev/api/planets")
                    ).json();

                    set({
                        planetNames: planetsData.results.map(
                            (pd: any) => pd.name
                        ),
                    });
                },
                setPlanetsData: (data) => {
                    set({ planetNames: data });
                },
            },
        }))
    )
);
