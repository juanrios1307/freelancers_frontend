import React,{Component} from 'react';
import '../assets/css/ChatEspecifico.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

class ChatEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Messages: '',
            id:'',
            mensaje:''
        };
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getMessages()
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


            if(data[0].isUser===false) {
                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor == "user" ? "user" : "worker"}>
                                {messages.mensaje}
                                <small className="text-muted" >{moment(messages.date).format('DD/MM/YYYY')} </small>
                            </li>

                        )
                    )
                })

            }else{
                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor == "user" ? "worker" : "user"}>
                                {messages.mensaje}
                                <small className="text-muted" >{moment(messages.date).format('DD/MM/YYYY')} </small>
                            </li>

                        )
                    )
                })
            }
        }
    }

    async sendMessage(e){
        e.preventDefault()

       const token=localStorage.getItem("token")

        // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
        const url = 'http://localhost:5000/api/chat/'


        var config = {
            method: 'put',
            url: url+this.state.id,
            headers: {
                'access-token': token,
                'Content-Type': 'application/json'
            },
            data : {
                "mensaje":this.state.mensaje
            }
        };

        const res = await Axios(config);

        const data = res.data.data;


        if(res.status==200) {
            Swal.fire({
                icon: 'success',
                title: data
            })
        }else if(res.status==400){
            Swal.fire({
                icon: 'error',
                title: data
            })
        }

        //window.location.reload();
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
                    <form onSubmit={this.sendMessage}>
                        <input type="text" value={this.state.mensaje} onChange={e => this.setState({mensaje: e.target.value})}/>
                        <button type="submit">Enviar</button>
                    </form>
                  </div>
              </div>
            </div>
        );
    }
}
export default ChatEspecifico;