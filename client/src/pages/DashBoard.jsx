import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import { getLabels, getNotes } from '../controller/notesController';
import '../App.css'
import { log } from "util";
var Alllabels;
var AllNotes;


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notesArray: [],
            labels: [],
            View: false
        }
        this.open = this.open.bind(this);
        // this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {

        getLabels().then(labels => {
            Alllabels = labels.data.data;
            console.log(Alllabels)
            this.setState({
                labels: Alllabels
            })
        })
            .catch(err => {
                console.log((err));

            })
        getNotes().then(notes => {
            AllNotes = notes.data.data;
            // console.log("All notes " + AllNotes);
            this.setState({
                notesArray: AllNotes
            })
        }).catch(err => {
            console.log(err);

        })

    }
    open(toggle) {
        this.setState({ View: toggle })
        console.log("state", this.state.View);

    }
    refresh = (animate) => {
        console.log("refresh hit dashboard", animate);

        if (animate) {
            console.log("refresh hit dashboard", animate);
            getLabels().then(labels => {
                Alllabels = labels.data.data;
                console.log("refreshed labels", Alllabels)
                this.setState({
                    labels: Alllabels
                })
            })
                .catch(err => {
                    console.log((err));

                })
            getNotes().then(notes => {
                AllNotes = notes.data.data;
                // console.log("All notes " + AllNotes);
                this.setState({
                    notesArray: AllNotes
                })
            }).catch(err => {
                console.log(err);

            })
        }
    }


    render() {
        console.log('toogle', this.state.View)
        return (
            <div className="Container">
                <div>
                    <NavBar labels={this.state.labels}
                        open={this.open} refresh={this.refresh} />
                </div>
                <div className="NotesScroll">
                    <TakeNote />
                    <Notes notes={this.state.notesArray} view={this.state.View} />
                </div>
                <input type='file' />
            </div>
        )
    }
}
export default DashBoard