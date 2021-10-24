import create, { GetState, SetState, StateCreator, StoreApi } from "zustand";

export interface StarWarsDictSlice {
    readonly infoNamesArr: string[];
    readonly infoDict: any;
    populateWithAPI: () => Promise<void>;
}

const createStarWarsDictSlice:
    | StateCreator<StarWarsDictSlice>
    | StoreApi<StarWarsDictSlice> = (set, get) => ({
    infoNamesArr: [],
    infoDict: {},
    populateWithAPI: async () => {
        let tempInfoNamesArr: string[] = [];
        let tempInfoDict: any = {};

        const [peopleDataRaw, planetsDataRaw, speciesDataRaw] =
            await Promise.all([
                await fetch("https://swapi.dev/api/people"),
                await fetch("https://swapi.dev/api/planets"),
                await fetch("https://swapi.dev/api/species"),
            ]);
        const [peopleData, planetsData, speciesData] = await Promise.all([
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
});

export default createStarWarsDictSlice as (
    set: SetState<StarWarsDictSlice>,
    get: GetState<StarWarsDictSlice>,
    api: StoreApi<StarWarsDictSlice>
) => StarWarsDictSlice;
