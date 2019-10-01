import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import { withRouter } from 'react-router-dom';
import { getLabels, getNotes, searchText } from '../controller/notesController';
import '../App.css'

var Alllabels;
var AllNotes;


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterArray: [],
            notesArray: [],
            labels: [],
            View: false,
            filterState: false
        }
        this.open = this.open.bind(this);
        // this.refresh = this.refresh.bind(this);
        this.search = this.search.bind(this);
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
    }
    refresh = (animate) => {

        if (animate) {
            getLabels().then(labels => {
                Alllabels = labels.data.data;
                this.setState({
                    labels: Alllabels
                })
            })
                .catch(err => {
                    console.log((err));

                })
            getNotes().then(notes => {
                AllNotes = notes.data.data;
                this.setState({
                    notesArray: AllNotes
                })
            }).catch(err => {
                console.log(err);

            })
        }
    }


    search = (searchValue) => {

        let payload = {
            search: searchValue
        }
        searchText(payload)
            .then(searchData => {
                var filt = [];
                console.log(searchData.data.data.hits.hits.length);


                searchData.data.data.hits.hits.map((element) => {
                    filt.push(element._source);

                })
                this.setState({ filterArray: filt, filterState: true })

                if (searchValue === '') {
                    this.setState({
                        filterState: false
                    })

                }
                // } else {
                //     this.setState({
                //         filterState: false
                //     })
                // }

            })
            .catch(err => {
                console.log(err);

            })

    }
    render() {
        console.log('toogle', this.state.View)
        return (
            <div className="Container">
                <div>
                    <NavBar labels={this.state.labels}
                        open={this.open} refresh={this.refresh} onSearch={this.search} />
                </div>
                <div className="NotesScroll">
                    <TakeNote />
                    <Notes notes={this.state.filterState ? this.state.filterArray : this.state.notesArray} view={this.state.View} />
                </div>
            </div>
        )
    }
}
export default withRouter(DashBoard)