import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import NavBar from "./NavBar";
import logo from '../assets/images/logo.svg'


class MainPage extends Component {
    render(){
        return (
            <div>
                <header className="App-header">
                    <NavBar/>
                    <div className="banner">

                    </div>

                </header>
                <img src={logo} className="align-self-center  mr-3" alt="banner"/>

            </div>
        );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}
export default MainPage;