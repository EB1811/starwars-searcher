import { devtools } from "zustand/middleware";
import create, {
    GetState,
    SetState,
    State,
    StateCreator,
    StoreApi,
} from "zustand";
import produce, { Draft } from "immer";
import createPlanetNamesSlice, {
    PlanetNamesSlice,
} from "./useStoreSlices/createPlanetNamesSlice";
import createStarWarsDictSlice, {
    StarWarsDictSlice,
} from "./useStoreSlices/createStarWarsDictSlice";

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

interface IStore extends PlanetNamesSlice, StarWarsDictSlice {}

export const useStore = create<IStore>(
    devtools(
        immer((set, get, api) => ({
            ...createPlanetNamesSlice(
                set as unknown as SetState<PlanetNamesSlice>,
                get as GetState<PlanetNamesSlice>,
                api as unknown as StoreApi<PlanetNamesSlice>
            ),
            ...createStarWarsDictSlice(
                set as unknown as SetState<StarWarsDictSlice>,
                get as GetState<StarWarsDictSlice>,
                api as unknown as StoreApi<StarWarsDictSlice>
            ),
        }))
    )
);

// * PRE SLICE STORE:
// export const useStore = create<StoreType>(
//     devtools(
//         immer((set, get) => ({
//             infoNamesArr: [],
//             infoDict: {},
//             planetNames: [],
//             populateWithAPI: async () => {
//                 let tempInfoNamesArr: string[] = [];
//                 let tempInfoDict: any = {};

//                 const [peopleDataRaw, planetsDataRaw, speciesDataRaw] =
//                     await Promise.all([
//                         await fetch("https://swapi.dev/api/people"),
//                         await fetch("https://swapi.dev/api/planets"),
//                         await fetch("https://swapi.dev/api/species"),
//                     ]);
//                 const [peopleData, planetsData, speciesData] =
//                     await Promise.all([
//                         await peopleDataRaw.json(),
//                         await planetsDataRaw.json(),
//                         await speciesDataRaw.json(),
//                     ]);

//                 peopleData.results.forEach((data: any) => {
//                     tempInfoNamesArr.push(data.name);
//                     tempInfoDict[data.name] = data;
//                 });
//                 planetsData.results.forEach((data: any) => {
//                     tempInfoNamesArr.push(data.name);
//                     tempInfoDict[data.name] = data;
//                 });
//                 speciesData.results.forEach((data: any) => {
//                     tempInfoNamesArr.push(data.name);
//                     tempInfoDict[data.name] = data;
//                 });

//                 set({ infoNamesArr: tempInfoNamesArr });
//                 set({ infoDict: tempInfoDict });
//             },
//             getPlanetNames: async () => {
//                 const planetsData = await (
//                     await fetch("https://swapi.dev/api/planets")
//                 ).json();

//                 set({
//                     planetNames: planetsData.results.map((pd: any) => pd.name),
//                 });
//             },
//             setPlanetNames: (data) => {
//                 set({ planetNames: data });
//             },
//         }))
//     )
// );
