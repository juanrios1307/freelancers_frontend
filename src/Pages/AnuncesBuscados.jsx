import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar";
import * as AiIcons from "react-icons/ai/index";
import moment from "moment";
import {Link, Redirect} from "react-router-dom";

class AnuncesBuscados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.specificWorker=this.specificWorker.bind(this);
    }

    componentDidMount() {

        this.getData();
    }

    specificWorker(id){
        localStorage.setItem("anunceID",id)

        window.location.reload();
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

                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/></button>
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
                            <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                  aria-haspopup="true" aria-expanded="false">Filtrar por</Link>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" href="#">Fecha: Antiguo-Reciente</Link>
                                <Link className="dropdown-item" href="#">Ubicación: Cercano-Lejano</Link>
                                <p>Valoracion</p>
                                <Link className="dropdown-item" href="#">Valoracion: Cercano-Lejano</Link>
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
                            <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                  aria-haspopup="true" aria-expanded="false">Filtrar por</Link>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" href="#">Fecha</Link>
                                <Link className="dropdown-item" href="#">Ubicación</Link>
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

export default AnuncesBuscados