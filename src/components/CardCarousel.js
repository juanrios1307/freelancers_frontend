import React,{Component} from 'react';
import '../assets/css/CardCarousel.css';
import Axios from "axios";
import nofoto from "../assets/images/nofoto.png"


class CardCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {


        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/promworkers'

       const url = 'http://localhost:5000/api/main/promworkers'

        const config = {
            method: 'get',
            url: url
        };

        var response=await Axios(config);

        var data = response.data.data;
        if(data[0].promedio != 0 ) {
            this.setState({
                Content: data.map((worker) => (
                    <div className="card" key={worker._id}>
                        <div className="card-icon"><img src={worker.promedio>0?worker.imagen:nofoto} alt="icon1"/></div>
                        <div className="card-body">
                            <h5 className="card-title">{worker.user.nombre}</h5>
                            <p className="card-text">{worker.profesion[0].toUpperCase() + worker.profesion.slice(1)}</p>
                            <p className="card-text">Correo: {worker.user.correo}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 20 mins ago</small>
                        </div>
                    </div>
                ))
            })
        }else{
            this.setState({Content:
                    <div className="div0">
                        <h5 className="card0">No tenemos sugerencias para ti !</h5>
                    </div>})
        }
    }



    render() {
        return (
            <section className="card-deck">
                {this.state.Content}
            </section>
        );
    }
}
export default CardCarousel