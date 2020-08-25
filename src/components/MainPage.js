import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import NavBar from "./NavBar";
import logo from '../assets/images/logo512.png'


class MainPage extends Component {
    render(){
        return (
            <div>
                <header className="App-header">
                    <NavBar/>
                    <div className="banner">

                    </div>

                </header>

            </div>
        );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}
export default MainPage;