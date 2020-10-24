import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import moment from "moment";

class MisChats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.deletePub = this.deletePub.bind(this);
        this.specificChat=this.specificChat.bind(this);

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

    specificChat(id){
        localStorage.setItem("ChatID",id)

        window.location.reload();
    }

    async getData() {

        const token = localStorage.getItem("token")
        // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat'

        const url = 'http://localhost:5000/api/chat'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

       var response=await Axios(config);

       var data = response.data.data;
       var bool = response.data.bool;

       console.log(JSON.stringify(data))
        console.log(JSON.stringify(bool))

        this.setState({
            Content: data.map((chat,index) => (
                    <div className="media" key={chat._id}>
                        <div className="media-body">
                            <h4 className="mt-0">{bool[index]?chat.worker.nombre:chat.user.nombre}</h4>
                            <p className="card-text">{chat.Mensajes[chat.Mensajes.length-1].emisor=="user"?chat.user.nombre:chat.worker.nombre} : {chat.Mensajes[chat.Mensajes.length-1].mensaje}</p>

                            <button type="button" className="btn btn-outline btn-list" onClick={(e) => this.specificChat(chat._id)}><AiIcons.AiFillEye/></button>

                            <div className="card-footer">
                                <small className="text-muted">{moment(chat.Mensajes[chat.Mensajes.length-1].date).format('DD/MM/YYYY')}</small>
                            </div>
                        </div>

                    </div>

                ))
        })

    }

    render() {
        if (localStorage.getItem("ChatID")) {
            return (
                <Redirect to="/chat"/>
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


                </Grid>
            )
        };
    }

}

export default MisChats