import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import moment from "moment"
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class MisAnuncios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.deleteAnuncio = this.deleteAnuncio.bind(this);
        this.specificAnunce=this.specificAnunce.bind(this);
        this.editAnuncio=this.editAnuncio.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    editAnuncio(id,e){

        localStorage.setItem("editID",id)
        localStorage.setItem("editIDAux",id)
        window.location.reload()
    }

    async deleteAnuncio(id, e) {
        e.preventDefault()
        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/anuncesWork/'
        const url = 'http://localhost:5000/api/anuncesWork/'

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

        window.location.reload();
    }

    specificAnunce(id){
        localStorage.setItem("anunceID",id)
        localStorage.setItem("anunceIDAux",id)

        window.location.reload();
    }

    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/anuncesWork'
        const url = 'http://localhost:5000/api/anuncesWork'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

        var response = await Axios(config);

        var data = response.data.data;
        if(data.length>0){
            this.setState({
                Content: data.map((anunces) => (
                    <div className="media" key={anunces._id}>
                        <img className="mr-3 imgList" src={anunces.imagen} alt='imagen'/>
                        <div className="media-body">
                            <h6 className="mt-0">{anunces.titulo}</h6>
                            <p className="card-text">Profesión : {anunces.profesion}</p>
                            <p className="card-text">Presuspuesto: {anunces.presupuesto}</p>
                            <p className="card-text">Descripción: {anunces.especificaciones}</p>
                            <p className="card-text">Ciudad: {anunces.ciudad}</p>

                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.editAnuncio(anunces._id, e)}>
                                <AiIcons.AiFillEdit/>
                            </button>


                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.deleteAnuncio(anunces._id, e)}><AiIcons.AiFillDelete/></button>
                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.specificAnunce(anunces._id)}><AiIcons.AiFillEye/></button>

                            <div className="card-footer">
                                <small className="text-muted">Subido {moment(anunces.date).format('DD/MM/YYYY')} </small>
                            </div>

                        </div>

                    </div>

                ))
            })

    }else {
    this.setState({
        Content: <div>
            <h4 className="noProduct">No tienes anuncios.</h4>
            <h5 className="noProduct">Crealos desde el botón.</h5>
        </div>
    })
}

    }

    render() {
        if (localStorage.getItem("editID")) {
            return(
                <Redirect to="/editAnunce" />
                )

        } else {
            if (localStorage.getItem("anunceID")) {
                return (
                    <Redirect to="anunce"/>
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
                            <a href='/createAnunce'>
                                <button className='buttonDash'>
                                    Publicar anuncio
                                </button>
                            </a>
                        </Grid>


                    </Grid>
                )
            }
            ;
        }
    }

}

export default MisAnuncios