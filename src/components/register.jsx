import React from "react";
import loginImg from '../assets/images/login.svg';
import Logo from '../assets/images/Logo/BLACK PNG.png'

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Registro</div>
                <div className="content">
                    <div className="image">
                        <img src={Logo} alt="LogIn-image"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Nombre Completo</label>
                            <input type="text" name="username" placeholder="Nombre completo" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" name="email" placeholder="Correo Electrónico" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" placeholder="Contraseña" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="tel" name="phone" placeholder="Teléfono" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Registrar
                    </button>
                </div>
            </div>
        );
    }
}
export default Register