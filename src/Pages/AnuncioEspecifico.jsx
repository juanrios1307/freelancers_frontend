import React,{Component} from 'react';
import '../assets/css/AnuncioEspecifico.css';
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
import * as AiIcons from "react-icons/ai";
import Axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Comentario from "../components/Comentario";

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
            titulo:''
        };
        this.getData = this.getData.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    async getData(){
        this.state.id=localStorage.getItem("anunceID")
        if(this.state.id) {
            localStorage.removeItem("anunceID")

            // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/anunces'
            const url = 'http://localhost:5000/api/main/anunces'

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
            this.setState({descripcion: data.descripcion});
            this.setState({presupuesto: data.presupuesto});
            this.setState({imagen: data.imagen});
            this.setState({titulo: data.titulo});
        }
    }

    render(){
        if (localStorage.getItem("token")) {
            return (
                <div className="allcontainer">
                    <DashNav/>
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
                                    <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="coments-container">
                        <div className="comentbox">
                            <div className="txtcoment">Comentarios y Valoraciones</div>
                            <div className="comenta">
                                <form>
                                    <div className="rating">
                                        <Rating
                                            name="simple-controlled"
                                        /></div>
                                    <input type="text"/>
                                    <button type="submit">Guardar</button>
                                </form>
                            </div>
                        </div>
                        <div className="coments">
                            <ul>
                                <li><Comentario/></li>
                                <li><Comentario/></li>
                                <li><Comentario/></li>
                            </ul>
                        </div>
                    </div>
                    <div className="contactbox">
                        <div className="contactbox-title">
                            <h10>Contacto</h10>
                        </div>
                        <p>Nombre: {this.state.nombre}</p>
                        <p>Teléfono: {this.state.telefono}</p>
                        <p>Correo: {this.state.correo}</p>
                        <form>
                            <label>Asunto:</label>
                            <input type="text"/>
                            <label>Mensaje:</label>
                            <input type="text"/>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                    <Footer/>
                </div>
            );
        }else{
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
                                    <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="coments-container">
                        <div className="comentbox">
                            <div className="txtcoment">Comentarios y Valoraciones</div>
                            <div className="comenta">
                                <form>
                                    <div className="rating">
                                        <Rating
                                            name="simple-controlled"
                                        /></div>
                                    <input type="text"/>
                                    <button type="submit">Guardar</button>
                                </form>
                            </div>
                        </div>
                        <div className="coments">
                            <ul>
                                <li><Comentario/></li>
                                <li><Comentario/></li>
                                <li><Comentario/></li>
                            </ul>
                        </div>
                    </div>
                    <div className="contactbox">
                        <div className="contactbox-title">
                            <h10>Contacto</h10>
                        </div>
                        <p>Nombre: {this.state.nombre}</p>
                        <p>Teléfono: {this.state.telefono}</p>
                        <p>Correo: {this.state.correo}</p>
                        <form>
                            <label>Asunto:</label>
                            <input type="text"/>
                            <label>Mensaje:</label>
                            <input type="text"/>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}
export default AnuncioEspecifico;