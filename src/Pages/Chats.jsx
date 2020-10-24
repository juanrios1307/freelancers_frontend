import React,{Component} from 'react';
import '../assets/css/Chats.css';
import DashNav from "../components/DashNav.js";

class Chats extends Component {

    render(){
        return (
            <div>
                <header>
                    <DashNav/>
                </header>
                <div className="chats-title">
                    Chats Activos
                </div>
                <div className="chats-activos">
                    <ul>
                        <li>
                            
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Chats;