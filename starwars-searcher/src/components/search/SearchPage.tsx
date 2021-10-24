import React, { useState, useEffect } from "react";
import { useStore } from "../../stores/useStore";

const SearchPage = () => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [text, setText] = useState("");

    const infoDict = useStore((state) => state.infoDict);
    const infoNamesArr = useStore((state) => state.infoNamesArr);
    const populateWithAPI = useStore((state) => state.populateWithAPI);

    useEffect(() => {
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
