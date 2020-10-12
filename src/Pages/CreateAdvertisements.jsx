import React,{Component} from 'react';
import '../assets/css/CreateAdvertisemets.css'
import DashNav from "../components/DashNav";
import Upload from "../assets/images/Upload2.png";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class CreateAdvertisements extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo :'',
            especificaciones:'',
            presupuesto:'',
            profesion:'',
            ciudad:'',
            imagen:'',
            imagenFile:'',
            bool:false
        }

        this.signupanunce = this.signupanunce.bind(this);

    }




    async signupanunce(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")
        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/anunceswork'

        const url='http://localhost:5000/api/anunceswork'

        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/eia/image/upload';
        const UPLOAD_PRESET = 't2rsbe8l';


        const formImages = new FormData();
        formImages.append('file', this.state.imagenFile);
        formImages.append('upload_preset', UPLOAD_PRESET);


        try {
            const resI = await Axios.post(CLOUDINARY_URL, formImages);
            this.setState({imagen:resI.data.secure_url});


        } catch (err) {
            console.error(err);
        }

        var config = {
            method: 'post',
            url: url,
            headers: {
                'access-token': token
            },
            data: this.state
        };

        const response=await Axios(config)

        const mensaje = response.data.data


        console.log(mensaje)
        Swal.fire({
            icon: 'success',
            title: mensaje
        })

        this.setState({bool:true})

    }


    render() {
        if (this.state.bool) {
            return <Redirect to='/dashboard'/>
        } else {
            return (
                <div>
                    <div>
                        <DashNav/>
                    </div>

                    <div className='TittleAN'>
                        <h8>Crea tu Anuncio</h8>
                        <hr/>
                    </div>
                    <div className='TittleIN'>
                        <h10>Información del servicio</h10>
                    </div>
                    <div className="formato">
                        <form className="form" onSubmit={this.signupanunce}>
                            <div className="f-g">
                                <label htmlFor="title">Título del anuncio: </label>
                                <input type="text" name="username" required
                                       value={this.state.titulo}
                                       onChange={(e) => this.setState({titulo: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="Description">Descripción: </label>
                                <input type="text" name="Description" required
                                       value={this.state.especificaciones}
                                       onChange={(e) => this.setState({especificaciones: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Presupuesto hora: </label>
                                <input type="number" name="Presupuesto" required
                                       value={this.state.presupuesto}
                                       onChange={(e) => this.setState({presupuesto: e.target.value})}/>
                            </div>
                    <hr/>
                    <div className='TittleIN'>
                        <h10>Información del trabajador</h10>
                    </div>
                            <div className="f-g">
                                <label htmlFor="title">Profesión: </label>
                                <input type="text" name="profesion" required
                                       value={this.state.profesion}
                                       onChange={(e) => this.setState({profesion: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="city">Ciudad: </label>
                                <input type="text" name="ciudad" required
                                       value={this.state.ciudad}
                                       onChange={(e) => this.setState({ciudad: e.target.value})}/>
                            </div>

                            <div className="f-g">
                                <label htmlFor="username">Imagen de perfil</label>
                                <input type="file" name="imagen" placeholder="imagen"
                                       onChange={(e) => this.setState({imagenFile: e.target.files[0]})}/>
                            </div>

                            <div className="ft">
                                <button type="submit" className="btn">
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr/>

                </div>
            );
        }
    }
}
export default CreateAdvertisements;