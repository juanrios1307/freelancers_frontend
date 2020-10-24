import React from "react";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import MainPage from "./Pages/MainPage";
import SavingPub from "./Pages/SavingPub";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import RegisterWorker from "./Pages/RegisterWorker";
import WorkersBuscados from "./Pages/WorkersBuscados";
import AnuncesBuscados from "./Pages/AnuncesBuscados";
import CreateAdvertisements from "./Pages/CreateAdvertisements";
import MisAnuncios from "./Pages/MisAnuncios";
import EditAnunce from "./Pages/EditAnunce"
import WorkerEspecifico from "./Pages/WorkerEspecifico";
import ChatEspecifico from "./Pages/ChatEspecifico";
import AnuncioEspecifico from "./Pages/AnuncioEspecifico";
import MisChats from "./Pages/MisChats";


class App extends React.Component {
    render() {
        return(

            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/sing-up" component={LoginRegisterPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/createAnunce" component={CreateAdvertisements}/>
                    <Route exact path="/editAnunce" component={EditAnunce} />
                    <Route exact path="/misanuncios" component={MisAnuncios} />
                    <Route exact path="/saves" component={SavingPub} />
                    <Route exact path="/signupworker" component={RegisterWorker} />
                    <Route exact path="/workers" component={WorkersBuscados} />
                    <Route exact path="/anunces" component={AnuncesBuscados} />
                    <Route exact path="/worker" component={WorkerEspecifico}/>
                    <Route exact path="/anunce" component={AnuncioEspecifico}/>
                    <Route exact path="/chat" component={ChatEspecifico}/>
                    <Route exact path="/chats" component={MisChats}/>
                </Switch>
            </Router>

        )
    }
};

export default App;
