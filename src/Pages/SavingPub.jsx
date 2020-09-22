import React from "react";
import Axios from "axios";
import '../assets/css/CardCarousel.css';


class SavingPub extends React.Component {

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

        const token = localStorage.getItem("token")
        // const url = 'https://peaceful-ridge-86113.herokuapp.com/api/saving'

        const url = 'http://localhost:5000/api/saving'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

       var response=await Axios(config);

       var data = response.data.data;

        this.setState({
            Content: data.map((worker) => (
                    <div className="card-body" key={worker._id}>
                        <h3 className="card-title">Nombre: {worker.user.nombre}</h3>
                        <p className="card-text">Email: {worker.user.correo}</p>
                        <p className="card-text">Profesión : {worker.profesion}</p>
                        <p className="card-text">Experiencia: {worker.experiencia}</p>
                        <p className="card-text">Años de experiencia: {worker.yearsXperience}</p>
                        <div className="card-footer">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </div>

                    </div>

                ))
        })

    }

    render(){
        return(
            <div>
                {this.state.Content}
            </div>
        )};

}

export default SavingPub