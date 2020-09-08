import React from "react";
import loginImg from '../assets/images/login.svg';
import Logo from '../assets/images/Logo/BLACK PNG.png'
import Axios from "axios";
import Swal from "sweetalert2";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            correo:'',
            pwd:'',
        }

        this.login = this.login.bind(this);

    }



    async login(e){
        e.preventDefault()

        const url = 'https://peaceful-ridge-86113.herokuapp.com/api/login'
        //const url='http://localhost:5000/api/login'

        const response = await Axios.post(
            url,
            this.state)

        const mensaje = response.data.mensaje

        console.log(mensaje)

        Swal.fire({
            icon: 'success',
            title: mensaje
        })

    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Iniciar Sesión</div>
                <div className="content">
                    <div className="image">
                        <img src={Logo} alt="LogIn-image"/>
                    </div>
                    <form className="form" onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" name="email" placeholder="Correo Electrónico" required
                                   value={this.state.correo}
                                   onChange={(e) => this.setState({correo: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" placeholder="Contraseña" required
                                   value={this.state.pwd}
                                   onChange={(e) => this.setState({pwd: e.target.value})}/>
                        </div>
                        <div className="footer">
                            <button type="submit" className="btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}
export default Login