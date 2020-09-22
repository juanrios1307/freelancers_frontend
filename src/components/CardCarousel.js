import React,{Component} from 'react';
import '../assets/css/CardCarousel.css';
import icono1 from '../assets/images/pi1.jpeg';
import icono2 from '../assets/images/pi2.jpeg';
import icono3 from '../assets/images/pi3.jpeg';



class CardCarousel extends Component {

    render() {
        return (
            <section className="card-deck">
                <div className="card">
                    <div className="card-icon" ><img src={icono1} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">Andrea Sánchez</h5>
                        <p className="card-text">Diseñadora Grafica y creadora de Apps.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 20 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" ><img src={icono2} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">Juan Montoya</h5>
                        <p className="card-text">Traductor y puedo trabajar en redacción y corrección de textos y artículos.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" ><img src={icono3} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">Carlos García</h5>
                        <p className="card-text">Pintor y escultor profesional.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 5 mins ago</small>
                    </div>
                </div>
            </section>
        );
    }
}
export default CardCarousel