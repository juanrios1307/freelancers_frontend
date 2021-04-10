import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements,} from "@stripe/react-stripe-js";
import Axios from "axios";
import Swal from "sweetalert2";

import gold from '../assets/images/gold.png'
import silver from '../assets/images/silver.png'
import bronze from '../assets/images/bronze.png'

function  CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        setLoading(true);

        if (!error) {
            // console.log(paymentMethod)
            const {id} = paymentMethod;
            try {

                const url='http://localhost:5000/api/membership/'
                //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/membership/'

                const token = localStorage.getItem("token")

                var amount = 10

                if(type == "gold"){
                    amount=3000
                }else if(type == "silver"){
                    amount=2000
                }else if(type=="bronze"){
                    amount=1000
                }

                var config ={
                    method: 'post',
                    url:url,
                    headers: {'access-token': token},
                    data:{id, amount: amount,description:type}
                }

                const response = await Axios(config);

                console.log(response);

                var status=response.status

                if(status==200){
                    Swal.fire({
                        title: response.data.mensaje,

                    })

                }else{
                    Swal.fire({
                        title: response.data.mensaje,
                    })
                }

                //elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    console.log(!stripe || loading);

    return (

        <form className="card card-body" onSubmit={handleSubmit}>
                <div className="container">
                <div className="row justify-content-center">
                    {/* Product Information */}

                    <div className="col">
                        <img
                            src={gold}
                            alt="Corsair Gaming Keyboard RGB"
                            className="img-fluid"
                        />

                        <h3 className="text-center my-2">Valor: 30$</h3>

                        <input className="form-check-input" type="radio" id="inlineRadio3" name="inlineRadioOptions" value="gold" onChange={e => setType(e.target.value)}/>

                    </div>

                    <div className="col">
                        <img
                            src={silver}
                            alt="Corsair Gaming Keyboard RGB"
                            className="img-fluid"
                        />

                        <h3 className="text-center my-2">Valor: 20$</h3>

                        <input className="form-check-input" type="radio" id="inlineRadio2" name="inlineRadioOptions" value="silver" onChange={e => setType(e.target.value)}/>

                    </div>

                    <div className="col">
                        <img
                            src={bronze}
                            alt="Corsair Gaming Keyboard RGB"
                            className="img-fluid"
                        />

                        <h3 className="text-center my-2">Valor: 10$</h3>

                        <input className="form-check-input" type="radio" id="inlineRadio1" name="inlineRadioOptions" value="bronze" onChange={e => setType(e.target.value)}/>

                    </div>

                </div>
                </div>

            <br/>

                {/* User Card Input */}
                <div className="form-group">
                    <CardElement/>
                </div>

                <button disabled={!stripe} className="btn btn-success">
                    {loading ? (
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        "Buy"
                    )}
                </button>


            </form>

    );
}

export default CheckoutForm