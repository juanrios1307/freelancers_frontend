import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar";

class AnuncesBuscados extends React.Component {

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


         //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/anunces'

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
                <NavBar/>
            </Grid>

            <Grid item xs={12}>
                {this.state.Content}
            </Grid>



        </Grid>
        )};

}

export default AnuncesBuscados