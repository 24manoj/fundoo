import React, { Component } from 'react';

import reg from '../services/userservices';
export default class login extends Component {

    render() {
        let google = () => { reg.login() }
        return (
            <div>
                <h1>Fundoo Registeration</h1>
                <button onClick={google}>google</button>
            </div>
        )
    }
}