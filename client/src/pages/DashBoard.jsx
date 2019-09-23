import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import '../App.css'
class DashBoard extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className="Conatiner" >
                <NavBar />

            </div>
        )
    }
}
export default DashBoard