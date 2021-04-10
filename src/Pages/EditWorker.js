import React from 'react';
import '../assets/css/CreateAdvertisemets.css'
import Axios from "axios";
import Swal from "sweetalert2";
import DashNav from "../components/DashNav";
import {Redirect} from "react-router-dom";

class EditWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boolW:false,
            id:'',

            profesionA:'',
            experienciaA:'',
            yearsXperienceA : '',

            profesion:'',
            experiencia:'',
            yearsXperience : ''
        };
        this.user = this.user.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }



    componentDidMount() {
        this.user()
    }

    async user() {

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/workers/'
        const url='http://localhost:5000/api/workers/'

        const token = localStorage.getItem("token")
        const id=localStorage.getItem("editIDAuxW")
        localStorage.removeItem("editIDW")

        this.setState({id:id})

        const config = {
            method: 'get',
            url: url+id,
            headers: {
                'access-token': token
            }
        };

        const res = await Axios(config);

        const data = res.data.data;

        console.log(JSON.stringify(data))

        this.setState({profesionA:data.profesion});
        this.setState({experienciaA:data.experiencia})
        this.setState({yearsXperienceA:data.yearsXperience})
    }

    async actualizar(e){

        e.preventDefault()

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/workers/'
        const url='http://localhost:5000/api/workers/'

        const token = localStorage.getItem("token")
        const id=this.state.id

        if(this.state.profesion.length<=0){
            this.state.profesion=this.state.profesionA
        }
        if(this.state.experiencia.length<=0){
            this.state.experiencia=this.state.experienciaA
        }
        if(this.state.yearsXperience.length<=0){
            this.state.yearsXperience=this.state.yearsXperienceA
        }

       var config = {
            method: 'put',
            url: url+id,
            headers: {
                'access-token': token
            },
            data: this.state
        };


        const response=await Axios(config)

        const mensaje = response.data.data

        Swal.fire({
            title: mensaje
        })

        this.setState({boolW:true});
        window.location.reload()
    }

    render() {
        if (this.state.boolW) {
            return (
                <Redirect to="/misworkers"/>
            )

        } else {

            return (
                <div>
                    <div>
                        <DashNav/>
                    </div>

                        <div className='TittleAN'>
                            <h8>Edita tu Worker</h8>
                            <hr/>
                        </div>
                        <div className='TittleIN'>
                            <h10>Información del servicio</h10>
                        </div>
                        <div className="formato">
                        <form className="form" onSubmit={this.actualizar}>
                            <div className="f-g">
                                <label htmlFor="titulo">Profesion: </label>
                                <input type="text" name="titulo" placeholder={this.state.profesionA}
                                       onChange={e => this.setState({profesion:e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="description">Experiencia: </label>
                                <input type="text" name="description" placeholder={this.state.experienciaA}
                                       onChange={e => this.setState({experiencia:e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="presupuesto">Años Experiencia: </label>
                                <input type="number" name="presupuesto" placeholder={this.state.yearsXperienceA}
                                       onChange={e => this.setState({yearsXperience:e.target.value})}/>
                            </div>

                            <div className="ft">
                                <button type="submit" className="btn">
                                    Editar
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default EditWorker;