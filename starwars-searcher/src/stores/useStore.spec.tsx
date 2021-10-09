import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
import { useStore } from "./useStore";

describe("useStore", () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it("The setPlanetNames function correctly sets the planetNames variable.", () => {
        const { result } = renderHook(() => useStore((state) => state));

        act(() => {
            result.current.api.setPlanetNames(["earth"]);
        });

        expect(result.current.planetNames).toEqual(["earth"]);
    });
});
