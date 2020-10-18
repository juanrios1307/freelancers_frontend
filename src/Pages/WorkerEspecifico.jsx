import React,{Component} from 'react';
import '../assets/css/WorkerEspecifico.css';
import DashNav from "../components/DashNav";
import img1 from "../assets/images/pi3.jpeg";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
import * as AiIcons from "react-icons/ai";

class WorkerEspecifico extends Component {

    render(){
        return (
            <div className="allcontainer">
                <NavBar/>
                <div className="boxcontainer">
                    <div className="imgbox">
                        <img className="imgPub" src={img1} alt="imagen de publicacion"/>
                    </div>
                    <div className="inforbox">
                        <div className="infoespec">
                            <h8>TITULO DEL ANUNCIO</h8>
                            <hr/>
                            <h10>Información del servicio</h10>
                            <p>Descripción: Aquí va la descripción del anuncio a describir en le worker especifico</p>
                            <p>Presupuesto por hora: </p>
                            <h10>Información del trabajador</h10>
                            <p>Profesión: </p>
                            <p>Ciudad: </p>
                        </div>
                        <div className="botnutl">
                            <div className="btnsaesp">
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillStar/></button>
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/></button>
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillEye/></button>
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
                            <p>Nombre: </p>
                            <p>Teléfono: </p>
                            <p>Correo: </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default WorkerEspecifico;