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
            Content: '',
            Profesiones:'',
            profesion:''
        };
        this.getData = this.getData.bind(this);
        this.getContent=this.getContent.bind(this)

        this.specificWorker=this.specificWorker.bind(this);
        this.crearChat=this.crearChat.bind(this);

        this.getFiltroCiudad=this.getFiltroCiudad.bind(this)
        this.getFiltroDate=this.getFiltroDate.bind(this)
        this.getFiltroPresupuesto=this.getFiltroPresupuesto.bind(this)
    }

    componentDidMount() {

        this.getData();
        this.getCiudades();
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
                title: "Por favor registrese antes de continuar"
            })
        }
    }

    async getData() {

        this.state.profesion = localStorage.getItem("profesionAux")

        this.setState({profesion:localStorage.getItem("profesionAux")})

        localStorage.removeItem("profesion")
        localStorage.removeItem("categoria")


        // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/anunces'
        const url = 'http://localhost:5000/api/main/anunces'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion': this.state.profesion
            }
        };

       var response=await Axios(config);

       var data = response.data.data;

       this.getContent(data)

    }

    async getCiudades() {
        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/ciudadesa'
        const url = 'http://localhost:5000/api/filters/ciudadesa'

        const config = {
            method: 'get',
            url: url,
            headers: {
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.setState({
            Profesiones: data.map((ciudad) => (
                <option  value={ciudad} >{ciudad}</option>
            ))
        })
    }

    async getFiltroCiudad(ciudad){

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/ciudadesa'
        const url = 'http://localhost:5000/api/filters/ciudadesa'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion,
                'ciudad': ciudad
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    async getFiltroDate(ismayor){

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/date'
        const url = 'http://localhost:5000/api/filters/date'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion,
                'ismayor': ismayor
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)

    }

    async getFiltroPresupuesto(ismayor){

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/presupuesto'
        const url = 'http://localhost:5000/api/filters/presupuesto'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion,
                'ismayor': ismayor
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)

    }

    getContent(data){

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
                                <select className="sort-drop" onChange={(e) => this.getFiltroDate(e.target.value)}>
                                    <option >Fecha</option>
                                    <option  value="true" >Reciente - Antiguo</option>
                                    <option  value="false" >Antiguo - Reciente</option>
                                </select>
                                <select className="sort-drop" onChange={(e) => this.getFiltroPresupuesto(e.target.value)}>
                                    <option >Presupuesto</option>
                                    <option  value="true" >Mayor - Menor</option>
                                    <option  value="false" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop" onChange={(e) => this.getFiltroCiudad(e.target.value)}>
                                    <option >Ciudad</option>
                                    {this.state.Profesiones}
                                </select>

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