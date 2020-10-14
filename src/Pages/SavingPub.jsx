import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";

class SavingPub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.deletePub = this.deletePub.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async deletePub(id,e){
        e.preventDefault()
        const token = localStorage.getItem("token")
         const url = 'https://peaceful-ridge-86113.herokuapp.com/api/saving/'

        //const url = 'http://localhost:5000/api/saving/'

        console.log(url + id)

        const config = {
            method: 'put',
            url: url + id,
            headers: {
                'access-token': token
            }
        };

        var response = await Axios(config);

        Swal.fire({
            icon: 'success',
            title: response.data.data
        })

        window.location.reload();
    }

    async getData() {

        const token = localStorage.getItem("token")
         const url = 'https://peaceful-ridge-86113.herokuapp.com/api/saving'

        //const url = 'http://localhost:5000/api/saving'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
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
                            <button type="button" className="btn btn-outline btn-list" onClick={(e) => this.deletePub(worker._id,e)}><AiIcons.AiFillDelete/></button>

                            <div className="card-footer">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>

                    </div>

                ))
        })

    }

    render(){
        return(
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <DashNav/>
            </Grid>


            <Grid item xs={12}>
                {this.state.Content}
            </Grid>



        </Grid>
        )};

}

export default SavingPub