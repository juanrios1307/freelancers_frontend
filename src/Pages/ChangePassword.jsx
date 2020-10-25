import React,{Component} from 'react';
import '../assets/css/ForgotPasword.css';
import Logo from "../assets/images/Logo/BLACK PNG.png";
import {Link} from "react-router-dom";

class ChangePassword extends Component {

    render(){
        return (
            <div className="pagforgot">
                <div className="forgotbox">
                    <img src={Logo} alt="logo"/>
                    <div  className="forgottitle">
                        <h8>Cambia tu contraseña</h8>
                    </div>
                    <form onSubmit={this.enviarForm} >
                        <label>Nueva Contraseña</label>
                        <input type="email" name="email" placeholder="Correo Electrónico" required/>
                        <label>Confirmar Contraseña</label>
                        <input type="email" name="email" placeholder="Correo Electrónico" required/>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default ChangePassword;