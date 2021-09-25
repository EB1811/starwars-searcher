import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
import { useStore } from "./useStore";

describe("useStore", () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it("The setPlanetsData function correctly sets the planetsData variable.", () => {
        const { result } = renderHook(() => useStore((state) => state));

        act(() => {
            result.current.api.setPlanetsData({ name: "Earth" });
        });

        expect(result.current.planetsData).toEqual({ name: "Earth" });
    });
});
