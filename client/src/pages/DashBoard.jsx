import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import { withRouter } from 'react-router-dom';
import { Popper, Paper, ClickAwayListener, IconButton, Snackbar } from "@material-ui/core";
import { UndoOutlined } from '@material-ui/icons'
import { getLabels, getNotes, searchText, updateColor, updateArchive, createNote, UndoArchive, updateReminder, undoReminder } from '../controller/notesController';
import '../App.css'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

var Alllabels;
var AllNotes;
var UndoTakeNote;

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterArray: [],
            notesArray: [],
            labels: [],
            View: false,
            filterState: false,
            colorPoper: false,
            cardId: '',
            AnchorEl: '',
            NoteColor: '',
            Archive: '',
            stackBar: false,
            stackBarMessage: '',
            reminderPoper: false,
            colorPalette: [
                { name: 'default', colorCode: '#FDFEFE' },
                { name: 'Red', colorCode: '#ef9a9a' },
                { name: 'Cyan', colorCode: '#80deea' },
                { name: 'Blue', colorCode: '#2196f3' },
                { name: 'Indigo', colorCode: '#9fa8da' },
                { name: 'LightBlue', colorCode: '#90caf9' },
                { name: 'Purple', colorCode: '#b39ddb' },
                { name: 'Yellow', colorCode: '#fff59d' },
                { name: 'Lime', colorCode: '#e6ee9c' },
                { name: 'Pink', colorCode: ' #f48fb1' },
                { name: 'gray', colorCode: '#eeeeee' },
                { name: 'Brown', colorCode: '#bcaaa4' }
            ]

        }
        this.open = this.open.bind(this);
        // this.refresh = this.refresh.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
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

            })
            .catch(err => {
                console.log(err);

            })

    }

    setValue = async (cardId, anchorEl, poper, Archive) => {
        try {


            await this.setState({ cardId: cardId, AnchorEl: anchorEl, colorPoper: poper, Archive: Archive })
            console.log("in Color Poper", this.state.AnachorEl);
            if (this.state.Archive == true) {
                this.noteArchive()
            }

        } catch (err) {
            console.log(err);

        }
    }
    noteArchive = () => {
        try {
            let payload = {
                noteId: this.state.cardId
            }
            updateArchive(payload)
                .then(updatedData => {
                    let index = this.state.notesArray.map(ele => ele._id).indexOf(this.state.cardId)
                    let array = this.state.notesArray;
                    UndoTakeNote = array.splice(index, 1)[0]
                    this.setState({ notesArray: array })
                    console.log(updatedData);
                    this.setState({
                        NoteColor: '',
                        AnchorEl: null,
                        cardId: '',
                        colorPoper: false,
                        Archive: false,


                    })
                    this.setState({
                        stackBar: true,
                        stackBarMessage: 'Note Archived sucess'
                    })
                })
                .catch(err => {
                    console.log(err);

                })
        } catch (err) {
            console.log(err);

        }
    }
    setNoteColor = async (event) => {
        try {
            await this.setState({ NoteColor: event.target.value })
            let payload = {
                color: this.state.NoteColor,
                noteId: this.state.cardId
            }
            updateColor(payload)
                .then(updated => {
                    let index = this.state.notesArray.map(ele => ele._id).indexOf(this.state.cardId)
                    let array = this.state.notesArray;
                    array[index].color = this.state.NoteColor;
                    this.setState({ notesArray: array })
                    this.setState({
                        NoteColor: '',
                        AnchorEl: null,
                        cardId: '',
                        reminderPoper: false,
                        colorPoper: false
                    })
                })

        } catch (err) {
            console.log(err);

        }
    }
    createNote = (payload) => {
        try {
            createNote(payload)
                .then(note => {

                    let array = this.state.notesArray;
                    if (payload.Archive == false) {
                        array.push(note.data.data)
                    }
                    if (payload.Archive === true) {
                        this.setState({
                            stackBar: true,
                            stackBarMessage: 'Note Archived'
                        })
                    }
                    UndoTakeNote = note.data.data
                    this.setState({ notesArray: array })


                })
                .catch(err => {
                    console.log(err);

                })

        } catch (err) {
            console.log(err);

        }
    }
    NoteReminder = async (reminderPoper, anchorEl, noteId) => {
        try {
            console.log(reminderPoper, anchorEl, noteId);
            await this.setState({ reminderPoper: reminderPoper, AnchorEl: anchorEl, cardId: noteId })
            if (!this.state.reminderPoper) {
                let payload = {
                    noteId: this.state.cardId
                }
                undoReminder(payload)
                    .then(removedReminder => {
                        let index = this.state.notesArray.map(ele => ele._id).indexOf(this.state.cardId)
                        let array = this.state.notesArray;
                        array[index].reminder = null;
                        this.setState({ notesArray: array, cardId: '' })
                        console.log(removedReminder);

                    })
                    .catch(err => {
                        console.log(err);

                    })
            }

        } catch (err) {
            console.log(err);

        }

    }

    dateSet = (dateTime) => {
        let payload = {
            reminder: dateTime,
            noteId: this.state.cardId
        }
        updateReminder(payload)
            .then(reminder => {
                let index = this.state.notesArray.map(ele => ele._id).indexOf(this.state.cardId)
                let array = this.state.notesArray;
                array[index].reminder = new Date(dateTime + 1).toString().slice(0, 15);
                this.setState({
                    notesArray: array,
                    cardId: '',
                    dateTime: '',
                    AnchorEl: null
                })
                // console.log('rem ', reminder);
            })
            .catch(err => {
                console.log(err);

            })

    }

    undoArchive = () => {
        console.log(UndoTakeNote);

        let payload = {
            noteId: UndoTakeNote._id
        }
        UndoArchive(payload)
            .then(updated => {
                let array = this.state.notesArray;
                array.push(UndoTakeNote)
                this.setState({
                    stackBar: false,
                    stackBarMessage: ''
                })
                UndoTakeNote = ''

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
                    <TakeNote createNote={this.createNote} NoteArchived={this.NoteArchived} labels={this.state.labels} />
                    <Notes notes={this.state.filterState ? this.state.filterArray : this.state.notesArray} view={this.state.View}
                        setValue={this.setValue} NoteReminder={this.NoteReminder} />
                </div>
                <Popper open={this.state.colorPoper} anchorEl={this.state.AnchorEl}
                    placement={'top-start'}
                    style={{ width: '100px' }} >
                    <ClickAwayListener onClickAway={event => this.setState({ colorPoper: false })}>
                        <Paper  >  {this.state.colorPalette.map((code, index) =>
                            <IconButton
                                key={index}
                                style={{ backgroundColor: code.colorCode, width: '20px', height: '15px', margin: '2px' }}
                                title={code.name}
                                onClick={this.setNoteColor} value={code.colorCode} />
                        )}</Paper>

                    </ClickAwayListener>
                </Popper>
                <Popper open={this.state.reminderPoper} anchorEl={this.state.AnchorEl} >

                    <Paper>
                        <ClickAwayListener onClickAway={event => this.setState({ reminderPoper: false, anchorEl: '' })}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    onClose={() => this.setState({ reminderPoper: false, anchorEl: null })}
                                    onChange={this.dateSet}
                                    errortext='Required'
                                />
                            </MuiPickersUtilsProvider>
                        </ClickAwayListener>
                    </Paper>

                </Popper>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.stackBar}
                    autoHideDuration={3000}
                    message={this.state.stackBarMessage}
                    // onClose={this.snackbarClose}
                    action={
                        <UndoOutlined onClick={this.undoArchive} />
                    }
                />

            </div>

        )
    }
}
export default withRouter(DashBoard)