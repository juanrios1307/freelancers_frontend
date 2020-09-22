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
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" ><img src={icono2} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to
                            additional content.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon" ><img src={icono3} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural
                            lead-in to additional content. This card has even longer content than the first to show
                            that equal height action.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </section>
        );
    }
}
export default CardCarousel