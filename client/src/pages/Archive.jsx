
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a Archive componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/

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
        /** @description rxjs obsever */
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

    /**
     * @description method loads data after render
     */
    componentWillMount() {
        try {
            getArchiveNotes()
                .then(archivedNotes => {
                    let AllNotes = archivedNotes.data.data
                    AllNotes.sort((a, b) => {
                        return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
                    })
                    this.setState({
                        ArchiveArray: AllNotes
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }
    /**
    * @desc  makes a note archive
    */
    Archive = () => {
        try {
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
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @desc  sets reminder notes
    * @param arraynotes notes 
    * @dateTime reminder to update
    * @param cardId note id
    */
    reminder = (arraynotes, dateTime, cardId) => {
        try {
            if (dateTime === undefined) {
                let index = this.state.ArchiveArray.map(ele => ele._id).indexOf(cardId)
                let array = this.state.ArchiveArray;
                array[index].reminder = null;
                this.setState({ ArchiveArray: array })
            } else {
                let index = this.state.ArchiveArray.map(ele => ele._id).indexOf(cardId)
                let array1 = this.state.ArchiveArray
                array1[index].reminder = new Date(dateTime + 1).toString().slice(0, 15);
                this.setState({ ArchiveArray: array1 })
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
    * @desc  updates color 
    * @param color color code
    * @param cardId note id
    */
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
    /**
    * @desc  trash note
    * @param element note details
    */
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
    /**
    * @desc add label to note
    * @param data label detail
    * @param cardId note id
    */
    addNoteLabel = (data, cardId) => {
        try {
            let arrayNotes = this.state.ArchiveArray
            arrayNotes.forEach((element) => {
                if (element._id === cardId) {
                    element.labels.push(data)
                }
            })
            this.setState({ ArchiveArray: arrayNotes })
        } catch (err) {
            console.log(err);
        }
    }
    /**
    * @desc  removes label from note
    * @param labelid label id 
     */
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
