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
import moment from "moment";

class MyMemberships extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            boolM : true
        };
        this.getData = this.getData.bind(this);

    }

    componentDidMount() {
        this.getData();

    }



    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/membership/pays/'
        const url = 'http://localhost:5000/api/membership/pays/'

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
                Content: data.map((membresia) => (
                    <div className="media" key={membresia._id}>

                        <div className="media-body">
                            <h6 className="mt-0">Membresia {membresia.description}</h6>
                            <p className="card-text">Fecha Compra:  {moment(membresia.fechaCompra).format('DD/MM/YYYY')}</p>
                            <p className="card-text">Fecha Expiración : {moment(membresia.fechaExpiracion).format('DD/MM/YYYY')}</p>
                        </div>

                    </div>

                ))
            })
        }else{
            this.setState({
                Content: <div>
                    <h4 className="noProduct">Aun no has comprado ninguna Membresia .</h4>
                    <h5 className="noProduct">Comprala Ya!! </h5>
                </div>
            })
            this.setState({
                boolM:false
            })
        }

    }

    render() {


        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DashNav/>
                </Grid>


                <Grid item xs={12}>
                    {this.state.Content}
                </Grid>

                <Grid item xs={12} className='dashButtonDiv'>
                    <a href='/membership'>
                        <button className='buttonDash'>
                            {this.state.boolM?"Renovar Membresia":"Comprar Membresia"}
                        </button>
                    </a>


                </Grid>

            </Grid>
        )

    }

}

export default MyMemberships