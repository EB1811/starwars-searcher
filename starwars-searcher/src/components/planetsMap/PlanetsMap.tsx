import React, { useState, useEffect } from "react";
import { useStore } from "../../stores/useStore";

const PlanetsMap = () => {
    const planetNames = useStore((state) => state.planetNames);
    const getPlanetNames = useStore((state) => state.getPlanetNames);

    useEffect(() => {
        getPlanetNames?.();
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
