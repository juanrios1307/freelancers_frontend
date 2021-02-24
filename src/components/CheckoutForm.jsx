import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements,} from "@stripe/react-stripe-js";
import Axios from "axios";
import Swal from "sweetalert2";

function  CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

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

                const response = await Axios.post(
                    url,
                    {id, amount: 10000,}
                );

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

                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    console.log(!stripe || loading);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Product Information */}
            <img
                src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png"
                alt="Corsair Gaming Keyboard RGB"
                className="img-fluid"
            />

            <h3 className="text-center my-2">Price: 100$</h3>

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