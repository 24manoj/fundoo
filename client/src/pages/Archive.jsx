import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'
import { getArchiveNotes, UndoArchive, updateArchive } from "../controller/notesController";
import { messageService } from '../minddleware/middleWareServices';
import { Snackbar } from '@material-ui/core';
import { UndoOutlined } from '@material-ui/icons';
let ArchiveNote;
let UndoTakeNote;
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
                let AllNotes = archivedNotes.data.data
                AllNotes.sort((a, b) => {
                    return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
                })
                // let newArray = AllNotes.filter(ele => ele.index!==undefined).sort()
                console.log("notes", AllNotes);

                this.setState({
                    ArchiveArray: AllNotes
                })



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
    reminder = (arraynotes, dateTime, cardId) => {
        try {
            console.log("date time", dateTime, cardId, arraynotes);

            if (dateTime === undefined) {
                let index = this.state.ArchiveArray.map(ele => ele._id).indexOf(cardId)
                let array = this.state.ArchiveArray;
                array[index].reminder = null;
                this.setState({ ArchiveArray: array })
            } else {
                let index = this.state.ArchiveArray.map(ele => ele._id).indexOf(cardId)
                let array1 = this.state.ArchiveArray
                console.log("array", array1[index], index);

                array1[index].reminder = new Date(dateTime + 1).toString().slice(0, 15);
                this.setState({ ArchiveArray: array1 })

            }
        } catch (err) {
            console.log(err);

        }
    }
    color = (color, cardId) => {
        try {
            let index = this.state.ArchiveArray.map(ele => ele._id).indexOf(cardId)
            let array = this.state.ArchiveArray
            array[index].color = color;
            this.setState({ ArchiveArray: array })

        } catch (err) {
            console.log(err);

        }
    }
    Trash = (element) => {
        try {
            let arrayNotes = this.state.ArchiveArray;
            let index = arrayNotes.indexOf(element)
            UndoTakeNote = arrayNotes.splice(index, 1)[0]
            this.setState({ ArchiveArray: arrayNotes })
        } catch (err) {
            console.log(err);

        }
    }
    addNoteLabel = (data, cardId) => {
        try {
            let arrayNotes = this.state.ArchiveArray
            arrayNotes.forEach((element) => {
                if (element._id === cardId) {
                    element.labels.push(data)
                    // this.setState({ noteLabel: [...this.state.noteLabel, data] })
                }
            })
            this.setState({ ArchiveArray: arrayNotes })

        } catch (err) {
            console.log(err);

        }
    }
    removeNoteLabel = (labelid) => {
        try {
            let array = this.state.ArchiveArray
            array.forEach((element) => {
                element.labels.forEach((ele, index) => {
                    if (ele.id === labelid) {
                        element.labels.splice(index, 1)
                        this.setState({ ArchiveArray: array })
                    }
                })

            })
        } catch (err) {
            console.log(err);

        }
    }
    render() {

        return (
            <div>
                <DashBoard ArchiveComponent={this.props.location.state} ArchiveNotes={this.state.ArchiveArray} reminder={this.reminder} color={this.color}
                    Trash={this.Trash} addNoteLabel={this.addNoteLabel} removeNoteLabel={this.removeNoteLabel} />
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
