import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar";
import * as AiIcons from "react-icons/ai/index";
import moment from "moment";
import {Link, Redirect} from "react-router-dom";
import Swal from "sweetalert2";

class AnuncesBuscados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.specificWorker=this.specificWorker.bind(this);
        this.crearChat=this.crearChat.bind(this);
    }

    componentDidMount() {

        this.getData();
    }

    specificWorker(id){
        localStorage.setItem("anunceID",id)

        window.location.reload();
    }

    crearChat(id,e){
        e.preventDefault()
        if(localStorage.getItem("token")) {
            localStorage.setItem("anunceIDChat", id)

            window.location.reload();
        }else{
            Swal.fire({
                icon: 'info',
                title: "Por favor registrese antes de continuar"
            })
        }
    }

    async getData() {

        const profesion = localStorage.getItem("profesion")
        localStorage.removeItem("profesion")
        localStorage.removeItem("categoria")


        // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/anunces'
        const url = 'http://localhost:5000/api/main/anunces'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion': profesion
            }
        };

       var response=await Axios(config);

       var data = response.data.data;

        this.setState({
            Content: data.map((anunces) => (
                    <div className="media" key={anunces._id}>
                        <img className="mr-3 imgList" src={anunces.imagen} alt='imagen' />
                        <div className="media-body">
                            <h6 className="mt-0">{anunces.titulo}</h6>
                            <p className="card-text">Email: {anunces.user.correo}</p>
                            <p className="card-text">Telefono: {anunces.user.telefono}</p>
                            <p className="card-text">Profesión : {anunces.profesion}</p>
                            <p className="card-text">Ciudad : {anunces.ciudad}</p>

                            <button type="button" className="btn btn-outline btn-list">
                                <AiIcons.AiFillMessage onClick={(e) => this.crearChat(anunces._id, e)}/>
                            </button>
                            <button type="button" className="btn btn-outline btn-list"  onClick={(e) => this.specificWorker(anunces._id)}><AiIcons.AiFillEye/></button>

                            <div className="card-footer">
                                <small className="text-muted">Subido {moment(anunces.date).format('DD/MM/YYYY')} </small>
                            </div>
                        </div>

                    </div>

                ))
        })

    }

    render() {
        if (localStorage.getItem("anunceIDChat")) {
            return (
                <Redirect to="/chat"/>
            )
        } else {
            if (localStorage.getItem("token")) {
                if (localStorage.getItem("anunceID")) {
                    return (
                        <Redirect to="anunce"/>
                    )
                } else {
                    return (
                        <div>

                            <div item xs={12}>
                                <DashNav/>
                            </div>

                            <div className="sort">
                                <h8>Filtrar por</h8>
                                <select className="sort-drop">
                                    <option  value="workers" >Fecha</option>
                                    <option  value="workers" >Reciente - Antiguo</option>
                                    <option  value="anunces" >Antiguo - Reciente</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Valoración</option>
                                    <option  value="anunces" >Mayor - Menor</option>
                                    <option  value="workers" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Años de experiencia</option>
                                    <option  value="anunces" >Mayor - Menor</option>
                                    <option  value="workers" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Ciudad</option>
                                    <option  value="anunces" >Medellin</option>
                                    <option  value="workers" >Bogota</option>
                                    <option  value="workers" >Cali</option>
                                </select>
                                <button>Aplicar</button>
                            </div>
                            <div item xs={12}>
                                {this.state.Content}
                            </div>

                        </div>
                    )
                }
            } else {
                if (localStorage.getItem("anunceID")) {
                    return (
                        <Redirect to="anunce"/>
                    )
                } else {
                    return (
                        <div>

                            <div item xs={12}>
                                <NavBar/>
                            </div>

                            <div className="sort">
                            <h8>Filtrar por</h8>
                            <select className="sort-drop">
                                <option  value="workers" >Fecha</option>
                                <option  value="workers" >Reciente - Antiguo</option>
                                <option  value="anunces" >Antiguo - Reciente</option>
                            </select>
                            <select className="sort-drop">
                                <option  value="workers" >Valoración</option>
                                <option  value="anunces" >Mayor - Menor</option>
                                <option  value="workers" >Menor - Mayor</option>
                            </select>
                            <select className="sort-drop">
                                <option  value="workers" >Años de experiencia</option>
                                <option  value="anunces" >Mayor - Menor</option>
                                <option  value="workers" >Menor - Mayor</option>
                            </select>
                            <select className="sort-drop">
                                <option  value="workers" >Ciudad</option>
                                <option  value="anunces" >Medellin</option>
                                <option  value="workers" >Bogota</option>
                                <option  value="workers" >Cali</option>
                            </select>
                            <button>Aplicar</button>
                        </div>

                            <div item xs={12}>
                                {this.state.Content}
                            </div>

                        </div>
                    )
                }

            }
            ;
        }
    }

}

export default AnuncesBuscados