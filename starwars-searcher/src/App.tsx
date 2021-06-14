import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/login/loginPage";
import SearchPage from "./components/search/SearchPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div className='App'>
                        <header className='App-header'>
                            <LoginPage />
                        </header>
                    </div>
                </Route>
                <Route exact path='/search'>
                    <div className='App'>
                        <header className='App-header'>
                            <SearchPage />
                        </header>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
