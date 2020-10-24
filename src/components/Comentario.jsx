import React,{Component} from 'react';
import '../assets/css/Comentario.css';
import Rating from "@material-ui/lab/Rating";
import Axios from "axios";
import moment from "moment";

class Comentario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        console.log("Hola este es un comentario")
        this.getData();
    }

    async getData() {

        const url = 'https://peaceful-ridge-86113.herokuapp.com/api/rate/'+this.props.id

        //const url = 'http://localhost:5000/api/rate/'+this.props.id

        console.log("id prop: " +this.props.id)

        var config = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        var response = await Axios(config);

        var data = response.data.data;

        console.log("data:"+JSON.stringify(data))

        this.setState({
            Content: data.map((comments) => (
                <li>
                    <div className="comentario-p">
                        <p>{comments.comment}</p>
                        <div className="rating-p">
                            <Rating name="read-only" value={comments.rating} readOnly/>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Subido {moment(comments.date).format('DD/MM/YYYY')} </small>
                        </div>
                    </div>
                </li>
                )
            )
        }
        )

    }

    render()
        {
            return (
               <div>
                {this.state.Content}
               </div>
            );
        }
    }
export default Comentario;