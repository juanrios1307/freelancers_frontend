import React,{Component} from 'react';
import '../assets/css/ForgotPasword.css';
import Logo from '../assets/images/Logo/BLACK PNG.png';
import {Link} from 'react-router-dom';

class ForgotPasword extends Component {

    render(){
        return (
            <div className="pagforgot">
                <div className="forgotbox">
                    <img src={Logo} alt="logo"/>
                    <div  className="forgottitle">
                    <h8>¿Olvidaste tu contraseña?</h8>
                    </div>
                    <p>
                        ¡No hay problema! Ingresa tu correo electrónico y te mandaremos las instrucciones para que reestablezcas tu contraseña.
                    </p>
                    <form>
                        <input type="email" name="email" placeholder="Correo Electrónico" required/>
                        <button>Enviar Link</button>
                        <div className="loglink">
                        <Link to="/sing-up">Volver a Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ForgotPasword;
