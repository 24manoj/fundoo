import React, { Component } from 'react';

import Reg from '../services/userServices';
export default class login extends Component {

    render() {
        let google = () => { Reg.login(); }
        return (
            <div>
                <h1>Fundoo Registeration</h1>
                <button onClick={google}>google</button>
            </div>
        )
    }
}