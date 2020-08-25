import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import NavBar from "./NavBar";
import logo from '../assets/images/logo512.png'


class MainPage extends Component {
    render(){
        return (
            <body>
                <header className="App-header">
                    <NavBar/>
                    <div className="banner">

                    </div>

                </header>
                <div className="info1">
                    <h7 className="titulo1">
                        Busca,encuentra y ofrece trabajos
                    </h7>
                </div>
            </body>
        );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }
}
export default MainPage;