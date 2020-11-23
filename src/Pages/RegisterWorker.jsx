import React from "react";
import Logo from '../assets/images/Logo/BLACK PNG.png'
import Axios from "axios";
import Swal from "sweetalert2";
import '../assets/css/RegisterWorker.scss'
import {Redirect} from "react-router-dom";

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profesion :'',
            experiencia:'',
            yearsXperience:'',
            imagen:'',
            imagenFile:'',
            bool:false
        }

        this.signupworker = this.signupworker.bind(this);

    }

    async signupworker(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/workers'
        const url='http://localhost:5000/api/workers'

        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/eia/image/upload';
        const UPLOAD_PRESET = 'iiq0b57e';

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
            title: mensaje
        })

        this.setState({bool:true})

    }


    render() {
        if (this.state.bool) {
            return <Redirect to='/dashboard' />
        } else {

            return (
                <div className="b-container" ref={this.props.containerRef}>
                    <div className="h">Registro</div>
                    <div className="cont">
                        <div className="image">
                            <img src={Logo} alt="LogIn-image"/>
                        </div>
                        <form className="form" onSubmit={this.signupworker}>
                            <div className="form-group">
                                <label htmlFor="username">Profesión</label>
                                <input type="text" name="profesion" placeholder="Profesión" required
                                       value={this.state.profesion}
                                       onChange={(e) => this.setState({profesion: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Experiencia</label>
                                <textarea type="text" name="experiencia" placeholder="Experiencia" required
                                          value={this.state.experiencia}
                                          onChange={(e) => this.setState({experiencia: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Años de experiencia</label>
                                <input type="number" name="yearsXperience" placeholder="Años de experiencia" required
                                       value={this.state.yearsXperience}
                                       onChange={(e) => this.setState({yearsXperience: e.target.value})}
                               />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Imagen de perfil</label>
                                <input type="file" name="imagen" placeholder="imagen" required
                                       onChange={(e) => this.setState({imagenFile: e.target.files[0]})}/>
                            </div>
                            <div className="footer">
                                <button type="submit" className="btn">
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            );
        }
    }
}
export default Register