import React,{Component} from 'react';
import '../assets/css/ChatEspecifico.css';
import DashNav from "../components/DashNav";

class ChatEspecifico extends Component {

    render(){
        return (
            <div>
              <DashNav/>
              <div className="chatbox">
                  <div className="chattitle">
                      <div className="namechat">
                          Nombre del contacto
                      </div>
                  </div>
                  <div className="chatlistbox">
                      <ul>
                          <li>
                              Hola, Como estas?
                          </li>
                          <li>
                              Necesito saber sobre los productos
                          </li>
                      </ul>
                  </div>
                  <div className="chatinput">
                    <form>
                        <input type="text"/>
                        <button type="submit">Enviar</button>
                    </form>
                  </div>
              </div>
            </div>
        );
    }
}
export default ChatEspecifico;