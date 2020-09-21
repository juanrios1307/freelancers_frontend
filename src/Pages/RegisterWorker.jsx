import React from "react";
import Logo from '../assets/images/Logo/BLACK PNG.png'
import Axios from "axios";
import Swal from "sweetalert2";


export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profesion :'',
            experiencia:'',
            yearsXperience:'',
            titulo:'',
            imagen:''
        }

        this.signupworker = this.signupworker.bind(this);
    }

    async signupworker(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/workers'

        const url='http://localhost:5000/api/workers'

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

    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Registro</div>
                <div className="content">
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
                            <input type="text" name="yearsXperience" placeholder="Años de experiencia" required
                                   value={this.state.yearsXperience}
                                   onChange={(e) => this.setState({yearsXperience: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="tel" name="phone" placeholder="Teléfono"
                                   value={this.state.telefono}
                                   onChange={(e) => this.setState({telefono: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Ciudad</label>
                            <input type="text" name="username" placeholder="Ciudad"
                                   value={this.state.ciudad}
                                   onChange={(e) => this.setState({ciudad: e.target.value})}/>
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
export default Register