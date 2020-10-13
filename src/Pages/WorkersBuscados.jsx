import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import NavBar from "../components/NavBar";
import DashNav from "../components/DashNav";
import * as AiIcons from "react-icons/ai/index";
import * as BsIcons from "react-icons/bs/index";
import {Link} from "react-router-dom";

class WorkersBuscados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        const profesion = localStorage.getItem("profesion")
        localStorage.removeItem("profesion")
        localStorage.removeItem("categoria")

         const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/workers'

        //const url = 'http://localhost:5000/api/main/workers'

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
            Content: data.map((worker) => (
                    <div className="media" key={worker._id}>
                        <img className="mr-3 imgList" src={worker.imagen} alt='imagen' />
                        <div className="media-body">
                            <h6 className="mt-0">Nombre: {worker.user.nombre}</h6>
                            <p className="card-text">Email: {worker.user.correo}</p>
                            <p className="card-text">Profesión : {worker.profesion}</p>
                            <p className="card-text">Experiencia: {worker.experiencia}</p>
                            <p className="card-text">Años de experiencia: {worker.yearsXperience}</p>

                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillStar/></button>
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillMessage/></button>
                            <button type="button" className="btn btn-outline btn-list"><AiIcons.AiFillEye/></button>
                            <button type="button" className="btn btn-outline btn-list"><BsIcons.BsFillBookmarkFill/></button>
                        </div>

                    </div>

                ))
        })

    }

    render(){

        if(localStorage.getItem("token")){
            return(
                <div>

                    <div item xs={12}>
                        <DashNav />
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
        }else{
            return(
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

      };

}

export default WorkersBuscados