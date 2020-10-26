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
            mensaje:'',
            nombre:''
        };
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.crearChat = this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getID();
        this.crearChat();
        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getID(){
        this.state.id=localStorage.getItem("ChatID")
        this.setState({id:localStorage.getItem("ChatID")})
        localStorage.removeItem("ChatID")
    }

    async getMessages(){

        console.log("ID: "+this.state.id)
        if(this.state.id) {
            const token = localStorage.getItem("token")

            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
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

            if(data[0].isUser===false) {

                this.setState({nombre:data[1].user.nombre})

                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor === "user" ? "user" : "worker"}>
                                {messages.mensaje}
                                <small className="text-muted" >{moment(messages.date).format('DD/MM/YYYY')} </small>
                            </li>

                        )
                    )
                })

            }else{

                this.setState({nombre:data[1].worker.nombre})

                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor === "user" ? "worker" : "user"}>
                                {messages.mensaje}
                                <small className="text-muted" >{moment(messages.date).format('DD/MM/YYYY')} </small>
                            </li>

                        )
                    )
                })
            }


        }
    }

    async crearChat(){
        const worker=localStorage.getItem("workerIDChat")
        localStorage.removeItem("workerIDChat")
        const token=localStorage.getItem("token")

        if(worker){
            var axios = require('axios');

            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
            const url = 'http://localhost:5000/api/chat/'

            var config = {
                method: 'post',
                url: url+worker,
                headers: {
                    'access-token': token,
                    'Content-Type': 'application/json'
                },

            };

            const response=await Axios(config)

            const mensaje = response.data.data

            this.setState({id:response.data.id})

            if(response.status===200) {

                Swal.fire({
                    icon: 'success',
                    title: mensaje
                })

                this.getMessages()

            }
        }
    }

    async sendMessage(e){
        e.preventDefault()

       const token=localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
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


        if(res.status===200) {
            Swal.fire({
                icon: 'success',
                title: data
            })
        }else if(res.status===400){
            Swal.fire({
                icon: 'error',
                title: data
            })
        }


        await this.getMessages();
    }


    render(){
        return (
            <div>
              <DashNav/>
              <div className="chatbox">
                  <div className="chattitle">
                      <div className="namechat">
                          {this.state.nombre}
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