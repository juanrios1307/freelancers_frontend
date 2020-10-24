import React,{Component} from 'react';
import '../assets/css/ChatEspecifico.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import moment from "moment";

class ChatEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Messages: '',
            id:''
        };
        this.getMessages = this.getMessages.bind(this);

    }

    componentDidMount() {
        this.getMessages();
    }

    async getMessages(){
        this.state.id = localStorage.getItem("ChatID")
        const token = localStorage.getItem("token")

        if(this.state.id) {
            // localStorage.removeItem("ChatID")

            // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
            const url = 'http://localhost:5000/api/chat/'

            const config = {
                method: 'get',
                url: url+this.state.id,
                headers:{
                    'access-token': token
                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            console.log(JSON.stringify(data))

            this.setState({
                Messages: data.Mensajes.map((messages) => (

                        <li className={messages.emisor=="user"?"user":"worker"}>
                            {messages.mensaje}
                            <small className="text-muted">{moment(messages.date).format('DD/MM/YYYY')} </small>
                        </li>

                    )
                )
            })
        }
    }


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
                          {this.state.Messages}
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