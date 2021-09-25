import { cleanup } from "@testing-library/react";
import { useStore } from "../../stores/useStore";
import * as Store from "../../stores/useStore";

describe("ListOfOrganisationUsers", () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it("Loads the organisations the user is part of.", async () => {
        jest.spyOn(Store, "useStore").mockImplementation((fn) =>
            fn({
                infoNamesArr: [],
                infoDict: {},
                planetsData: {},
                api: {
                    populateWithAPI: async () => {},
                    setPlanetsData: (data) => {},
                },
            })
        );
    });
});
