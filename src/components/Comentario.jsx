import React,{Component} from 'react';
import '../assets/css/Comentario.css';
import Rating from "@material-ui/lab/Rating";

class Comentario extends Component {

    render(){
        return (
            <div className="comentario-p">
                <p>Nombre de Usuario</p>
                <hr/>
                <p>Este es mi comentario sobre el tema</p>
                <div className="rating-p">
                <Rating name="read-only" value={3} readOnly/>
                </div>
            </div>
        );
    }
}
export default Comentario;