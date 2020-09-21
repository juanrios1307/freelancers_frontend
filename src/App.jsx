import React from "react";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import MainPage from "./Pages/MainPage";
import SavingPub from "./Pages/SavingPub";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import RegisterWorker from "./Pages/RegisterWorker";


class App extends React.Component {
    render() {
        return(

            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/sing-up" component={LoginRegisterPage} />
                    <Route exact path="/saves" component={SavingPub} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/signupworker" component={RegisterWorker} />
                </Switch>
            </Router>

        )
    }
};

export default App;
