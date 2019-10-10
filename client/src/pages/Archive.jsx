import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'
import { getArchiveNotes } from "../controller/notesController";
class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArchiveArray: []
        }

    }
    componentWillMount() {
        getArchiveNotes()
            .then(archivedNotes => {
                this.setState(({
                    ArchiveArray: archivedNotes.data.data
                }))
            })
            .catch(err => {
                console.log(err);
            }
            )

    }
    render() {

        return (
            <div>
                <DashBoard ArchiveState={this.props.location.state} drawerNotes={this.state.ArchiveArray} />
            </div>
        )
    }
}
export default Archive;
