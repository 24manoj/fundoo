import React, { Component } from 'react';

import Reg from '../services/userServices';
export default class Register extends Component {

    sign = (response, type) => {
        console.log("in register")
        var data = {
            firstName: response.w3.ofa,
            lastName: response.w3.wea,
            email: response.w3.U3,
            password: response.w3.Eea
        }
        Reg.register(data);

    }
    GoogleResponse = () => {
        console.log("in GoogleResponse");
        // this.sign(response, 'google')
    }
    render() {
        let google = () => {
            console.log("ddfdf")
            Reg.register();

        }
        return (
            <div>
                <h1>Fundoo Registeration</h1>
                <button onClick={google}>google</button>
            </div>
        )
    }
}