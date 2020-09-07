import React from "react";
import loginImg from '../assets/images/login.svg';
import Logo from '../assets/images/Logo/BLACK PNG.png'

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Iniciar Sesión</div>
                <div className="content">
                    <div className="image">
                        <img src={Logo} alt="LogIn-image"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" name="email" placeholder="Correo Electrónico" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" placeholder="Contraseña" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
export default Login