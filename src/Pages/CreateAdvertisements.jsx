import React,{Component} from 'react';
import '../assets/css/CreateAdvertisemets.css'
import DashNav from "../components/DashNav";
import Upload from "../assets/images/Upload2.png";

class CreateAdvertisements extends Component {

    render(){
        return (
            <div>
                <div>
                    <DashNav/>
                </div>

                <div  className='TittleAN'>
                    <h8>Crea tu Anuncio</h8>
                    <hr/>
                </div>
                <div className='TittleIN'>
                    <h10>Información del servicio</h10>
                </div>
                <div className="formato">
                    <form className="form">
                        <div className="f-g">
                            <label htmlFor="title">Título del anuncio: </label>
                            <input type="text" name="username"/>
                        </div>
                        <div className="f-g">
                            <label htmlFor="Description">Descripción: </label>
                            <input type="text" name="Description"/>
                        </div>
                        <div className="f-g">
                            <label htmlFor="budget">Presupuesto: </label>
                            <input type="text" name="Presupuesto"/>
                        </div>
                    </form>
                </div>
                <hr/>
                <div className='TittleIN'>
                    <h10>Información del trabajador</h10>
                </div>
                <div className="formato">
                    <form className="form">
                        <div className="f-g">
                            <label htmlFor="title">Profesión: </label>
                            <input type="text" name="username"/>
                        </div>
                        <div className="f-g">
                            <label htmlFor="city">Ciudad: </label>
                            <input type="text" name="ciudad"/>
                        </div>
                    </form>
                </div>
                <hr/>
                <div className='TittleIN'>
                    <h10>Imagen</h10>
                    <div>
                    <img src={Upload} alt="Upload.jpg"/>
                    </div>
                </div>
                <hr/>
                <div className="ft">
                    <button type="submit" className="btn">
                        Publicar
                    </button>
                </div>
            </div>
        );
    }
}
export default CreateAdvertisements;