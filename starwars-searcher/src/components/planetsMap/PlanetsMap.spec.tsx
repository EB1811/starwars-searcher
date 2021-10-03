import { cleanup, render, screen } from "@testing-library/react";
import * as Store from "../../stores/useStore";
import PlanetsMap from "./PlanetsMap";

describe("ListOfOrganisationUsers", () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it("Component gets data from the store.", async () => {
        jest.spyOn(Store, "useStore").mockImplementation((fn) =>
            fn({
                planetNames: ["Tatooine", "Mandalore"],
                infoDict: {},
                infoNamesArr: [],
                api: {
                    setPlanetsData: (data) => {},
                    getPlanetsData: async () => {},
                    populateWithAPI: async () => {},
                },
            })
        );

        render(<PlanetsMap />);

        const listOfPlanets = screen.getByTestId("planets-list");
        expect(listOfPlanets.children).toHaveLength(2);

        expect(screen.queryByTestId("planet-Tatooine")).toBeTruthy();
        expect(screen.queryByTestId("planet-Mandalore")).toBeTruthy();
    });
});
