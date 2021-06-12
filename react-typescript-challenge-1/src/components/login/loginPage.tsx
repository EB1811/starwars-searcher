import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (username && password) {
            const peopleData = await (
                await fetch("https://swapi.dev/api/people")
            ).json();

            const findByName = peopleData.results.find((person: any) => {
                return person.name === username;
            });

            if (findByName && findByName.birth_year === password) {
                console.log("Login Successful");
                setUsername("");
                setPassword("");
            } else {
                console.log("Login Unsuccessful");
                setUsername("");
                setPassword("");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            ></input>
            <br />
            <input
                type='password'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            ></input>
            <br />
            <button>Submit</button>
        </form>
    );
};

export default LoginPage;
