import React from 'react';
import '../assets/css/CreateAdvertisemets.css'
import Axios from "axios";
import Swal from "sweetalert2";
import DashNav from "../components/DashNav";
import {Redirect} from "react-router-dom";

class EditAnunce extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bool:false,
            tituloA:'',
            especificacionesA:'',
            presupuestoA:'',
            profesionA:'',
            ciudadA:'',

            titulo:'',
            especificaciones:'',
            presupuesto:'',
            profesion:'',
            ciudad:''
        };
        this.user = this.user.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }



    componentDidMount() {
        this.user()
    }

    async user() {

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/anuncesWork/'
        const url='http://localhost:5000/api/anuncesWork/'

        const token = localStorage.getItem("token")
        const id=localStorage.getItem("editID")
        localStorage.removeItem("editID")
        localStorage.setItem("id",id)

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

        this.setState({tituloA:data.titulo});
        this.setState({especificacionesA:data.especificaciones})
        this.setState({presupuestoA:data.presupuesto})
        this.setState({profesionA:data.profesion})
        this.setState({ciudadA:data.ciudad});
    }

    async actualizar(e){

        e.preventDefault()

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/anuncesWork/'
        const url='http://localhost:5000/api/anuncesWork/'

        const token = localStorage.getItem("token")
        const id=localStorage.getItem("id")
        localStorage.removeItem("id")

        if(this.state.titulo.length<=0){
            this.state.titulo=this.state.tituloA
        }
        if(this.state.especificaciones.length<=0){
            this.state.especificaciones=this.state.especificacionesA
        }
        if(this.state.presupuesto.length<=0){
            this.state.presupuesto=this.state.presupuestoA
        }
        if(this.state.profesion.length<=0){
            this.state.profesion=this.state.profesionA
        }
        if(this.state.ciudad.length<=0){
            this.state.ciudad=this.state.ciudadA
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
            icon: 'success',
            title: mensaje
        })

        this.setState({bool:true});
        //window.location.reload()
    }

    render()
    {
        if (this.state.bool) {
            return (
                <Redirect to="/misanuncios"/>
            )

        } else {

            return (
                <div>
                    <div>
                        <DashNav/>
                    </div>

                        <div className='TittleAN'>
                            <h8>Edita tu Anuncio</h8>
                            <hr/>
                        </div>
                        <div className='TittleIN'>
                            <h10>Información del servicio</h10>
                        </div>
                        <div className="formato">
                        <form className="form" onSubmit={this.actualizar}>
                            <div className="f-g">
                                <label htmlFor="titulo">Titulo: </label>
                                <input type="text" name="titulo" placeholder={this.state.tituloA}
                                       onChange={e => this.setState({titulo:e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="description">Descripcion: </label>
                                <input type="text" name="description" placeholder={this.state.especificacionesA}
                                       onChange={e => this.setState({especificaciones:e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="presupuesto">Presupuesto Hora: </label>
                                <input type="number" name="presupuesto" placeholder={this.state.presupuestoA}
                                       onChange={e => this.setState({presupuesto:e.target.value})}/>
                            </div>

                            <hr/>
                            <div className='TittleIN'>
                                <h10>Información del trabajador</h10>
                            </div>

                            <div className="f-g">
                                <label htmlFor="profesion">Profesion: </label>
                                <input type="text" name="profesion" placeholder={this.state.profesionA}
                                       onChange={e => this.setState({profesion:e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="ciudad">Ciudad: </label>
                                <input type="text" name="ciudad" placeholder={this.state.ciudadA}
                                       onChange={e => this.setState({ciudad:e.target.value})}/>
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

export default EditAnunce;