import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar2 from "./Navbar2";
import BannerSection from "./BannerSection";
import Footer from "./Footer";
import CardCarousel from "./CardCarousel";

class MainPage extends Component {

    render(){
        return (
            <div>
                <header>
                    <Router>
                        <Navbar2/>
                        <Switch>
                            <Route path="/" exact />
                        </Switch>
                    </Router>
                </header>
                <div>
                    <BannerSection/>
                </div>
                <div>
                    <CardCarousel/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}
export default MainPage;