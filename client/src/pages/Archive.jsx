import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'
import { getArchiveNotes, UndoArchive, updateArchive } from "../controller/notesController";
import { messageService } from '../minddleware/middleWareServices';
import { Snackbar } from '@material-ui/core';
import { UndoOutlined } from '@material-ui/icons';
let ArchiveNote;
class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArchiveArray: [],
            snackBar: false,
            snackBarMessage: ''
        }


        messageService.getMessage().subscribe(message => {

            if (message.text.key === 'UnArchiveNote') {

                let payload = {
                    noteId: message.text.value._id
                }
                ArchiveNote = message.text.value
                UndoArchive(payload)
                    .then(UnArchivedNote => {
                        let array = [];
                        array = this.state.ArchiveArray;
                        let index = this.state.ArchiveArray.indexOf(message.text.value._id)
                        array.splice(index, 1)
                        this.setState({ ArchiveArray: array, snackBar: true, snackBarMessage: 'Note UnArchived Sucess' })
                        console.log("archive array", this.state.ArchiveArray);
                    })

            }
        })
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
    Archive = () => {

        let payload = {
            noteId: ArchiveNote._id
        }
        updateArchive(payload)
            .then(updatedArchive => {
                let array = this.state.ArchiveArray
                array.push(ArchiveNote)
                this.setState({
                    ArchiveArray: array,
                    snackBar: true,
                    snackBarMessage: 'Undo Archive Sucess'
                })


            })
    }
    render() {

        return (
            <div>
                <DashBoard ArchiveState={this.props.location.state} ArchiveNotes={this.state.ArchiveArray} />
                <Snackbar anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                    open={this.state.snackBar}
                    message={this.state.snackBarMessage}
                    action={
                        <UndoOutlined titleAccess="Undo" onClick={this.Archive} />
                    }
                    onClose={event => setTimeout(() => { this.setState({ snackBar: false, snackBarMessage: '' }) }, (1000))}
                />
            </div>
        )
    }
}
export default Archive;
