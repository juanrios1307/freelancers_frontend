import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar2 from "./Navbar2";


class MainPage extends Component {
    render(){
        return (
            <>
                <Router>
                    <Navbar2/>
                    <Switch>
                        <Route path="/" exact />
                    </Switch>
                </Router>
            </>
        );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}
export default MainPage;