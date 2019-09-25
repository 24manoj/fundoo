import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import '../App.css'
class DashBoard extends Component {

    render() {
        return (
            <div className="Container">
                <div>
                    <NavBar />
                </div>

                <div className="NotesScroll">
                    <TakeNote />
                    <Notes />
                </div>


            </div>
        )
    }
}
export default DashBoard