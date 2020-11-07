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
            Ciudades:'',

            profesion:'',
            ciudad:'',
            presupuesto:'true',
            date:'true'
        };
        this.getData = this.getData.bind(this);
        this.getCiudades=this.getCiudades.bind(this);
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
                'profesion': this.state.profesion,
                'fecha':this.state.date,
                'presupuesto':this.state.presupuesto
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
            Ciudades: data.map((ciudad) => (
                <option  value={ciudad} >{ciudad}</option>
            ))
        })
    }

    async getFiltroCiudad(ciudad){

        this.state.ciudad=ciudad
        this.setState({ciudad:ciudad})

        if(ciudad != ' ') {
            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/ciudadesa'
            const url = 'http://localhost:5000/api/filters/ciudadesa'

            const config = {
                method: 'get',
                url: url,
                headers: {
                    'profesion': this.state.profesion,
                    'ciudad':  this.state.ciudad,
                    'fecha':this.state.date,
                    'presupuesto':this.state.presupuesto
                }
            };


            var response = await Axios(config);

            var data = response.data.data;

            this.getContent(data)
        }else{
            this.getData()
        }
    }

    async getFiltroDate(ismayor){

        this.state.date=ismayor
        this.setState({date:ismayor})

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/date'
        const url = 'http://localhost:5000/api/filters/date'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion,
                'ismayor': ismayor,
                'presupuesto':this.state.presupuesto,
                'ciudad':this.state.ciudad==''?'':this.state.ciudad,
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)

    }

    async getFiltroPresupuesto(ismayor){

        this.state.presupuesto=ismayor
        this.setState({presupuesto:ismayor})

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/filters/presupuesto'
        const url = 'http://localhost:5000/api/filters/presupuesto'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion':  this.state.profesion,
                'ismayor': ismayor,
                'fecha':this.state.date,
                'ciudad':this.state.ciudad==''?'':this.state.ciudad,
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

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Fecha</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroDate(e.target.value)} >
                                        <option  value="true"  >Reciente - Antiguo</option>
                                        <option  value="false" >Antiguo - Reciente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Presupuesto</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPresupuesto(e.target.value)} >
                                        <option  value="true"  >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Ciudad</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCiudad(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Ciudades}
                                    </select>
                                </div>

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

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Fecha</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroDate(e.target.value)} >
                                        <option  value="true"  >Reciente - Antiguo</option>
                                        <option  value="false" >Antiguo - Reciente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Presupuesto</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPresupuesto(e.target.value)} >
                                        <option  value="true"  >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Ciudad</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCiudad(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Ciudades}
                                    </select>
                                </div>

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