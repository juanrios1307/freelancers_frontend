import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import NavBar from "../components/NavBar";
import DashNav from "../components/DashNav";
import * as AiIcons from "react-icons/ai/index";
import * as BsIcons from "react-icons/bs/index";
import {Link, Redirect} from "react-router-dom";
import Swal from "sweetalert2";

class WorkersBuscados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            Profesiones :'',
            profesion:''
        };
        this.getData = this.getData.bind(this);
        this.getCiudades=this.getCiudades.bind(this);
        this.getContent=this.getContent.bind(this)

        this.savePub=this.savePub.bind(this);
        this.specificWorker=this.specificWorker.bind(this);
        this.crearChat=this.crearChat.bind(this);

        this.getFiltroCiudad=this.getFiltroCiudad.bind(this)
        this.getFiltroValoracion=this.getFiltroValoracion.bind(this)
        this.getFiltroYearsExperience=this.getFiltroYearsExperience.bind(this)


    }

    componentDidMount() {
        this.getData();
        this.getCiudades();
    }

    async savePub(Save,e){
        e.preventDefault()
        const token=localStorage.getItem("token")


        if(token && token!==undefined){

            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/saving'
            const url = 'http://localhost:5000/api/saving'

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
                title: response.data.data
            })

        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })

        }
    }

    specificWorker(id){
        localStorage.setItem("workerID",id)
        localStorage.setItem("workerIDAux",id)

        window.location.reload();
    }

    crearChat(id,e){
        e.preventDefault()
        localStorage.setItem("workerIDChat",id)

        window.location.reload();
    }

    async getData() {

        this.state.profesion = localStorage.getItem("profesionAux")

        this.setState({profesion:localStorage.getItem("profesionAux")})

        localStorage.removeItem("profesion")
        localStorage.removeItem("categoria")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/workers'
        const url = 'http://localhost:5000/api/main/workers'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion
            }
        };



       var response=await Axios(config);

       var data = response.data.data;

       this.getContent(data)

    }

    async getCiudades() {
        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/ciudades'
        const url = 'http://localhost:5000/api/filters/ciudades'

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

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/ciudades'
        const url = 'http://localhost:5000/api/filters/ciudades'

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

    async getFiltroYearsExperience(ismayor){

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/years'
        const url = 'http://localhost:5000/api/filters/years'

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

    async getFiltroValoracion(ismayor){

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/promedio'
        const url = 'http://localhost:5000/api/filters/promedio'

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
            Content: data.map((worker) => (
                <div className="media" key={worker._id}>
                    <img className="mr-3 imgList" src={worker.imagen} alt='imagen' />
                    <div className="media-body">
                        <h6 className="mt-0">Nombre: {worker.user.nombre}</h6>
                        <p className="card-text">Email: {worker.user.correo}</p>
                        <p className="card-text">Profesión : {worker.profesion}</p>
                        <p className="card-text">Experiencia: {worker.experiencia}</p>
                        <p className="card-text">Años de experiencia: {worker.yearsXperience}</p>

                        <button type="button" className="btn btn-outline btn-list"  onClick={(e) => this.crearChat(worker._id,e)}><AiIcons.AiFillMessage/></button>
                        <button type="button" className="btn btn-outline btn-list"  onClick={(e) => this.specificWorker(worker._id)}><AiIcons.AiFillEye/></button>
                        <button type="button" className="btn btn-outline btn-list"  onClick={(e) => this.savePub(worker._id,e)}><BsIcons.BsFillBookmarkFill/></button>
                    </div>

                </div>

            ))
        })
    }

    render() {
        if (localStorage.getItem("workerIDChat")) {
            return (
                <Redirect to="/chat"/>
            )
        } else {

            if (localStorage.getItem("token")) {
                if (localStorage.getItem("workerID")) {
                    return (
                        <Redirect to="worker"/>
                    )
                } else {

                    return (
                        <div>

                            <div item xs={12}>
                                <DashNav/>
                            </div>

                            <div className="sort">
                                <h8>Filtrar por</h8>

                            <select className="sort-drop" onChange={(e) => this.getFiltroValoracion(e.target.value)} >
                                <option >Valoración</option>
                                <option  value="true" >Mayor - Menor</option>
                                <option  value="false" >Menor - Mayor</option>
                            </select>
                            <select className="sort-drop" onChange={(e) => this.getFiltroYearsExperience(e.target.value)}>
                                <option  >Años de experiencia</option>
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
                if (localStorage.getItem("workerID")) {
                    return (
                        <Redirect to="worker"/>
                    )
                } else {
                    return (
                        <div>

                            <div item xs={12}>
                                <NavBar/>
                            </div>

                            <div className="sort">
                                <h8>Filtrar por</h8>

                                <select className="sort-drop" onChange={(e) => this.getFiltroValoracion(e.target.value)} >
                                    <option >Valoración</option>
                                    <option  value="true" >Mayor - Menor</option>
                                    <option  value="false" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop" onChange={(e) => this.getFiltroYearsExperience(e.target.value)}>
                                    <option  >Años de experiencia</option>
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
            }
        }
        ;
    }
}

export default WorkersBuscados