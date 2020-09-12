import React from "react";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import MainPage from "./Pages/MainPage";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

class App extends React.Component {
    render() {
        return(

            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/login" component={LoginRegisterPage} />
                </Switch>
            </Router>

        )
    }
};

export default App;
