import React,{Component} from 'react';
import '../assets/css/AnuncioEspecifico.css';
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
import * as AiIcons from "react-icons/ai";
import Axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Comentario from "../components/Comentario";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class AnuncioEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            nombre:'',
            correo:'',
            telefono:'',
            profesion:'',
            descripcion:'',
            presupuesto:'',
            imagen:'',
            ciudad:'',
            titulo:'',

            asunto:'',
            mensaje:''
        };
        this.getData = this.getData.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.crearChat=this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData(){
        this.state.id=localStorage.getItem("anunceIDAux")
        if(this.state.id) {
            localStorage.removeItem("anunceID")

            const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/anunces'
            //const url = 'http://localhost:5000/api/main/anunces'

            console.log("ID: " + this.state.id)

            const config = {
                method: 'get',
                url: url,
                headers: {
                    "id": this.state.id
                }
            };

            const res = await Axios(config);

            const data = res.data.data;


            this.setState({nombre: data.user.nombre});
            this.setState({ciudad: data.user.ciudad});
            this.setState({telefono: data.user.telefono});
            this.setState({correo: data.user.correo});
            this.setState({profesion: data.profesion});
            this.setState({descripcion: data.especificaciones});
            this.setState({presupuesto: data.presupuesto});
            this.setState({imagen: data.imagen});
            this.setState({titulo: data.titulo});
        }
    }

    async sendMessage(e){
        e.preventDefault()

        const  token=localStorage.getItem("token")
        if(token && !token!=undefined){

            const url = 'https://peaceful-ridge-86113.herokuapp.com/api/contact/'+this.state.id
            //const url = 'http://localhost:5000/api/contact/'+this.state.id

            var config = {
                method: 'post',
                url: url,
                headers: {
                    'access-token': token,
                    'Content-Type': 'application/json'
                },
                data : {
                    "asunto":this.state.asunto,
                    "mensaje":this.state.mensaje,
                    "isWorker":false
                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            Swal.fire({
                title: data
            })


        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })
        }

    }


    crearChat(id,e){
        e.preventDefault()
        if(localStorage.getItem("token")) {
            localStorage.setItem("anunceIDChat", id)

            window.location.reload();
        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })
        }
    }

    render() {
        if (localStorage.getItem("anunceIDChat")) {
            return (
                <Redirect to="chat"/>
            )
        } else {
            if (localStorage.getItem("token")) {
                return (
                    <div className="allcontainer">
                        <DashNav className="DashNav"/>
                        <div className="boxcontainer">
                            <div className="imgbox">
                                <img className="imgPub" src={this.state.imagen} alt="imagen de publicacion"/>
                            </div>
                            <div className="inforbox">
                                <div className="infoespec">
                                    <h8>{this.state.titulo}</h8>
                                    <hr/>
                                    <h10>Información del servicio</h10>
                                    <p>Descripción: {this.state.descripcion}</p>
                                    <p>Presupuesto por hora: {this.state.presupuesto}</p>
                                    <h10>Información del trabajador</h10>
                                    <p>Profesión: {this.state.profesion}</p>
                                    <p>Ciudad: {this.state.ciudad}</p>
                                </div>
                                <div className="botnutl">
                                    <div className="btnsaesp">
                                        <button type="button" className="btn btn-outline btn-list">
                                            <AiIcons.AiFillMessage onClick={(e) => this.crearChat(this.state.id, e)}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contactbox">
                            <div className="contactbox-title">
                                <h10>Contacto</h10>
                            </div>
                            <p>Nombre: {this.state.nombre}</p>
                            <p>Teléfono: {this.state.telefono}</p>
                            <form onSubmit={this.sendMessage}>
                                <label>Asunto:</label>
                                <input type="text" onChange={e => this.setState({asunto: e.target.value})}/>
                                <label>Mensaje:</label>
                                <input type="text" onChange={e => this.setState({mensaje: e.target.value})}/>
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                        <Footer/>
                    </div>
                );
            } else {
                return (
                    <div className="allcontainer">
                        <NavBar/>
                        <div className="boxcontainer">
                            <div className="imgbox">
                                <img className="imgPub" src={this.state.imagen} alt="imagen de publicacion"/>
                            </div>
                            <div className="inforbox">
                                <div className="infoespec">
                                    <h8>{this.state.titulo}</h8>
                                    <hr/>
                                    <h10>Información del servicio</h10>
                                    <p>Descripción: {this.state.descripcion}</p>
                                    <p>Presupuesto por hora: {this.state.presupuesto}</p>
                                    <h10>Información del trabajador</h10>
                                    <p>Profesión: {this.state.profesion}</p>
                                    <p>Ciudad: {this.state.ciudad}</p>
                                </div>
                                <div className="botnutl">
                                    <div className="btnsaesp">
                                        <button type="button" className="btn btn-outline btn-list">
                                            <AiIcons.AiFillMessage onClick={(e) => this.crearChat(this.state.id, e)}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contactbox">
                            <div className="contactbox-title">
                                <h10>Contacto</h10>
                            </div>
                            <p>Nombre: {this.state.nombre}</p>
                            <p>Teléfono: {this.state.telefono}</p>
                            <p>Correo: {this.state.correo}</p>
                            <form onSubmit={this.sendMessage}>
                                <label>Asunto:</label>
                                <input type="text" onChange={e => this.setState({asunto: e.target.value})}/>
                                <label>Mensaje:</label>
                                <input type="text" onChange={e => this.setState({mensaje: e.target.value})}/>
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                        <Footer/>
                    </div>
                );
            }
        }
    }
}
export default AnuncioEspecifico;