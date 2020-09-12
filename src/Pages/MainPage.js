import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import BannerSection from "../components/BannerSection";
import Footer from "../components/Footer";
import CardCarousel from "../components/CardCarousel";

class MainPage extends Component {

    render(){
        return (
            <div>
                <header>
                    <Navbar2/>
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