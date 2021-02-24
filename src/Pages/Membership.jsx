import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements,} from "@stripe/react-stripe-js";
import axios from "axios";
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar";
import CheckoutForm from "../components/CheckoutForm";
import {Redirect} from "react-router-dom";

const stripePromise = loadStripe("pk_test_51IKU2KGfY2o0HPMwaEGcYANlXiXvODOZgX2g2reCmxRylyQwx6sYozTI9ohcVnDU1ybxhd7hLAFch3Rk0UoLsWx800YXXY9QDu");

class Membership extends React.Component{

    constructor(props) {
        super();
    }

    render(){
        if (localStorage.getItem("token")) {
            return (
                <div>

                    <div item xs={12}>
                        <DashNav/>
                    </div>

                    <Elements stripe={stripePromise}>
                        <div className="container p-4">
                            <div className="row h-100">
                                <div className="col-md-4 offset-md-4 h-100">
                                    <CheckoutForm />
                                </div>
                            </div>
                        </div>
                    </Elements>

                </div>
            )
        } else {
            return (
                <div>

                    <div item xs={12}>
                        <NavBar/>
                    </div>

                    <Elements stripe={stripePromise}>
                        <div className="container p-4">
                            <div className="row h-100">
                                <div className="col-md-4 offset-md-4 h-100">
                                    <CheckoutForm />
                                </div>
                            </div>
                        </div>
                    </Elements>

                </div>
            )
        }
    }

}

export default Membership;
