import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
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
    GoogleResponse = (response) => {
        console.log("in GoogleResponse", response);
        this.sign(response, 'google')
    }
    render() {
        return (
            <div>
                <h1>Fundoo Registeration</h1>
                <GoogleLogin
                    clientId={process.env.REACT_APP_DOC_CLIENTID}
                    buttonText="Google"
                    onSuccess={this.GoogleResponse} />
            </div>
        )
    }
}