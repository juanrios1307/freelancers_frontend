import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import NavBar from "../components/NavBar";
import DashNav from "../components/DashNav";
import * as AiIcons from "react-icons/ai/index";
import * as BsIcons from "react-icons/bs/index";
import {Link, Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import {fiFI} from "@material-ui/core/locale";
import {Grid} from "@material-ui/core";

class MisWorkers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
        };
        this.getData = this.getData.bind(this);

        this.specificWorker=this.specificWorker.bind(this);

        this.deleteWorker = this.deleteWorker.bind(this);
        this.editWorker=this.editWorker.bind(this);


    }

    componentDidMount() {
        this.getData();

    }

    editWorker(id, e){

        localStorage.setItem("editID",id)
        localStorage.setItem("editIDAux",id)
        window.location.reload()
    }

    async deleteWorker(id, e) {
        e.preventDefault()
        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/worker/'
        const url = 'http://localhost:5000/api/worker/'

        console.log(url + id)

        const config = {
            method: 'delete',
            url: url + id,
            headers: {
                'access-token': token
            }
        };

        var response = await Axios(config);

        Swal.fire({
            title: response.data.data
        })

        //window.location.reload();
    }


    async specificWorker(id){

        localStorage.setItem("workerID",id)
        localStorage.setItem("workerIDAux",id)

        window.location.reload();
    }


    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/workers'
        const url = 'http://localhost:5000/api/workers'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

       var response=await Axios(config);

       var data = response.data.data;

       this.getContent(data)

    }


    getContent(data){
        if(data.length>0) {
            this.setState({
                Content: data.map((worker) => (
                    <div className="media" key={worker._id}>
                        <img className="mr-3 imgList" src={worker.imagen} alt='imagen'/>
                        <div className="media-body">
                            <h6 className="mt-0">Nombre: {worker.user.nombre}</h6>
                            <p className="card-text">Email: {worker.user.correo}</p>
                            <p className="card-text">Profesión : {worker.profesion[0].toUpperCase() + worker.profesion.slice(1)}</p>
                            <p className="card-text">Experiencia: {worker.experiencia}</p>
                            <p className="card-text">Años de experiencia: {worker.yearsXperience}</p>

                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.deleteWorker(worker._id, e)}><AiIcons.AiFillDelete/></button>
                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.specificWorker(worker._id)}><AiIcons.AiFillEye/></button>
                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.editWorker(worker._id, e)}><AiIcons.AiFillEdit/></button>
                        </div>

                    </div>

                ))
            })
        } else{
            this.setState({
                Content: <div>
                    <h4 className="noProduct">Lo sentimos, no tenemos workers para mostrarte.</h4>
                    <h5 className="noProduct">Intenta una nueva busqueda !! </h5>
                </div>
                    })
        }
    }

    render() {
        if (localStorage.getItem("editID")) {
            return(
                <Redirect to="/editWorker" />
            )

        } else {
            if (localStorage.getItem("anunceID")) {
                return (
                    <Redirect to="worker"/>
                )
            } else {

                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DashNav/>
                        </Grid>


                        <Grid item xs={12}>
                            {this.state.Content}
                        </Grid>

                        <Grid item xs={12} className='dashButtonDiv'>
                            <a href='/signupworker'>
                                <button className='buttonDash'>
                                    Crear Worker
                                </button>
                            </a>
                        </Grid>

                    </Grid>
                )
            }
        }
    }

}

export default Misworkers