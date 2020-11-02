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
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.savePub=this.savePub.bind(this);
        this.specificWorker=this.specificWorker.bind(this);
        this.crearChat=this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getData();
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

    specificWorker(id){
        localStorage.setItem("workerID",id)

        window.location.reload();
    }

    crearChat(id,e){
        e.preventDefault()
        localStorage.setItem("workerIDChat",id)

        window.location.reload();
    }

    async getData() {

        const profesion = localStorage.getItem("profesion")
        localStorage.removeItem("profesion")
        localStorage.removeItem("categoria")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/workers'
        const url = 'http://localhost:5000/api/main/workers'

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
                                <select className="sort-drop">
                                    <option  value="workers" >Fecha</option>
                                    <option  value="reciente" >Reciente - Antiguo</option>
                                    <option  value="antiguo" >Antiguo - Reciente</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Valoración</option>
                                    <option  value="mayor" >Mayor - Menor</option>
                                    <option  value="menor" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Años de experiencia</option>
                                    <option  value="mayor" >Mayor - Menor</option>
                                    <option  value="menor" >Menor - Mayor</option>
                                </select>
                                <select className="sort-drop">
                                    <option  value="workers" >Ciudad</option>
                                    <option  value="medellin" >Medellin</option>
                                    <option  value="bogota" >Bogota</option>
                                    <option  value="cali" >Cali</option>
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
        }
        ;
    }
}

export default WorkersBuscados