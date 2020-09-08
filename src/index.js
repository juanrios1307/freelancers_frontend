import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './assets/css/index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import MainPage from "./Pages/MainPage";

const Index = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/login-register" component={LoginRegisterPage}/>
        </Switch>
    </BrowserRouter>

);

ReactDOM.render(<Index/>,document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

