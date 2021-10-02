import React, { useState, useEffect } from "react";
import { useStore } from "../../stores/useStore";

const PlanetsMap = () => {
    const planetNames = useStore((state) => state.planetNames);
    const setPlanetsData = useStore((state) => state.api.setPlanetsData);

    useEffect(() => {
        const populatePlanetsFromAPI = async () => {
            const planetsData = await (
                await fetch("https://swapi.dev/api/planets")
            ).json();
            setPlanetsData(planetsData.results.map((pd: any) => pd.name));
        };

        populatePlanetsFromAPI();
    }, []);

    return (
        <div>
            <h1>Planet Names</h1>
            <ul data-testId='planets-list'>
                {planetNames.map((name: any) => (
                    <li key={name} data-testId={`planet-${name}`}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlanetsMap;
