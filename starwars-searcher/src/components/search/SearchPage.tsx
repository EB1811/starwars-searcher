import React, { useState, useEffect } from "react";

const SearchPage = () => {
    const [infoNamesArr, setInfoNamesArr] = useState<string[]>([]);
    const [infoDict, setInfoDict] = useState<any>({});
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        let tempInfoNamesArr: string[] = [];
        let tempInfoDict: any = {};

        const populateWithAPI = async () => {
            const peopleData = await (
                await fetch("https://swapi.dev/api/people")
            ).json();
            const planetsData = await (
                await fetch("https://swapi.dev/api/planets")
            ).json();
            const speciesData = await (
                await fetch("https://swapi.dev/api/species")
            ).json();

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

            setInfoNamesArr(tempInfoNamesArr);
            setInfoDict(tempInfoDict);
        };

        populateWithAPI();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currText = e.target.value;
        let suggestions: string[] = [];
        if (currText.length > 0) {
            const regex = new RegExp(`^${currText}`, `i`);
            suggestions = infoNamesArr.sort().filter((v) => regex.test(v));
        }

        setText(e.target.value);
        setSuggestions(suggestions);
    };

    const learnMore = (name: string) => {
        console.log(infoDict[name]);
    };

    return (
        <div>
            <h2>Search</h2>
            <input type='text' onChange={handleChange}></input>
            <ul>
                {suggestions.map((name) => {
                    return (
                        <li key={name}>
                            <button onClick={() => learnMore(name)}>
                                {name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SearchPage;
