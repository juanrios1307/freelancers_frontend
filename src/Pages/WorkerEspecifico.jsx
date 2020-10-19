import React,{Component} from 'react';
import '../assets/css/WorkerEspecifico.css';
import DashNav from "../components/DashNav";
import img1 from "../assets/images/pi3.jpeg";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
import * as AiIcons from "react-icons/ai";
import Axios from "axios";
import Swal from "sweetalert2";
import * as BsIcons from "react-icons/bs/index";

class WorkerEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            nombre:'',
            correo:'',
            telefono:'',
            profesion:'',
            yearsE:'',
            experiencia:'',
            imagen:'',
            titulo:'',
            ciudad:'',
        };
        this.getData = this.getData.bind(this);
        this.savePub=this.savePub.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData(){
        this.state.id=localStorage.getItem("workerID")

        localStorage.removeItem("workerID")

       // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/workers'
        const url='http://localhost:5000/api/main/workers'

        console.log("ID: "+this.state.id)

            const config = {
                method: 'get',
                url: url,
                headers: {
                    "id":this.state.id
                }
            };

            const res = await Axios(config);

            const data = res.data.data;



            this.setState({nombre:data.user.nombre});
            this.setState({ciudad:data.user.ciudad});
            this.setState({telefono:data.user.telefono});
            this.setState({correo:data.user.correo});
            this.setState({profesion:data.profesion});
            this.setState({experiencia:data.experiencia});
            this.setState({yearsE:data.yearsXperience});
            this.setState({imagen:data.imagen});
            this.setState({titulo:data.titulo});

    }

    async savePub(Save,e){
        e.preventDefault()
        const token=localStorage.getItem("token")


        if(token && !token!=undefined){
            const url = 'https://peaceful-ridge-86113.herokuapp.com/api/saving'

            //const url = 'http://localhost:5000/api/saving'

            console.log(Save)

            const config = {
                method: 'put',
                url: url ,
                headers: {
                    'access-token': token
                },
                data: {
                    "Save":Save
                }
            };

            var response = await Axios(config);

            Swal.fire({
                icon: 'success',
                title: response.data.data
            })

        }else{
            Swal.fire({
                icon: 'info',
                title: "Por favor registrese antes de continuar"
            })

        }
    }

    render(){
        return (
            <div className="allcontainer">
                <NavBar/>
                <div className="boxcontainer">
                    <div className="imgbox">
                        <img className="imgPub" src={this.state.imagen} alt="imagen de publicacion"/>
                    </div>
                    <div className="inforbox">

                        <div className="infoespec">
                            <h8>{this.state.nombre}</h8>
                            <hr/>
                            <h10>Información del trabajador</h10>
                            <p>Profesión: {this.state.profesion}</p>
                            <p>Ciudad: {this.state.ciudad}</p>
                            <p>Experiencia: {this.state.experiencia}</p>
                            <p>Años de experiencia: {this.state.yearsE}</p>
                        </div>
                        <div className="botnutl">
                            <div className="btnsaesp">
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillStar/></button>
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/></button>
                                <button type="button" className="btn btn-outline btn-list"  onClick={(e) => this.savePub(this.state.id,e)}><BsIcons.BsFillBookmarkFill/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comentbox">
                    <div className="txtcoment">Comentarios</div>
                    <div className="comenta">
                        <form>
                            <input type="text"/>
                            <button type="submit">Guardar</button>
                        </form>
                        <div className="contactbox">
                            <h10>Contacto</h10>
                            <hr/>
                            <p>Nombre: {this.state.nombre}</p>
                            <p>Teléfono: {this.state.telefono}</p>
                            <p>Correo: {this.state.correo}</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default WorkerEspecifico;