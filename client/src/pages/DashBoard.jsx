import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import { withRouter } from 'react-router-dom';
import { Popper, Paper, ClickAwayListener, IconButton, Snackbar, Card, TextField, Checkbox, Dialog, Menu, MenuItem } from "@material-ui/core";
import { UndoOutlined, DeleteOutline, AddCircleOutline, Message } from '@material-ui/icons'
import {
    getLabels, getNotes, searchText, updateColor, updateArchive, createNote, UndoArchive, updateReminder, undoReminder,
    removeNoteLabel, addNoteLabel, NoteTrash, undoTrash, createLabel
} from '../controller/notesController';
import '../App.css'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { messageService } from '../minddleware/middleWareServices'
var Alllabels;
var AllNotes;
var UndoTakeNote;
var tabindex;
class DashBoard extends Component {
    constructor(props) {
        super(props);
        // this.eventEmitter = new EventEmitter();
        this.state = {
            filterArray: [],
            notesArray: [],
            noteLabel: [],
            labels: [],
            newReminder: '',
            filterstateLabel: false,
            newLabel: '',
            labelValue: '',
            View: false,
            searchLabels: [],
            filterState: false,
            colorPoper: false,
            cardId: '',
            labelanchor: null,
            AnchorEl: null,
            NoteColor: '',
            Archive: '',
            stackBar: false,
            found: true,
            stackBarMessage: '',
            OptionsPoper: false,
            labelListPoper: false,
            reminderPoper: false,
            trashState: false,
            foundLabel: true,
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
        this.search = this.search.bind(this);
        messageService.getMessage().subscribe(message => {
            console.log("in dbgdhfdfhd", message.text);

            if (message.text.key === 'updateNotes' && message.text.key !== undefined) {
                console.log("in constructor", message.text.title);
                let index = this.state.notesArray.map(ele => ele._id).indexOf(message.text.value.noteId)
                let array = this.state.notesArray;
                array[index].title = message.text.value.title
                array[index].content = message.text.value.content
                this.setState({
                    notesArray: array
                })
            }
        })

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
                messageService.sendMessage({ key: 'reminder', value: (new Date(dateTime + 1).toString().slice(0, 15)) })
                this.setState({
                    notesArray: array,
                    cardId: '',
                    dateTime: '',
                    AnchorEl: null,
                    newReminder: array[index].reminder
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
        if (this.state.trashState) {
            undoTrash(payload)
                .then(update => {
                    let array = this.state.notesArray;
                    array.push(UndoTakeNote)
                    this.setState({
                        notesArray: array,
                        stackBar: false,
                        stackBarMessage: ''
                    })
                    UndoTakeNote = ''

                })
        } else {
            UndoArchive(payload)
                .then(updated => {
                    let array = this.state.notesArray;
                    array.push(UndoTakeNote)
                    this.setState({
                        notesArray: array,
                        stackBar: false,
                        stackBarMessage: ''
                    })
                    UndoTakeNote = ''

                })


                .catch(err => {
                    console.log(err);

                })
        }
    }

    removeNoteLabel = (cardId, labelId) => {
        try {
            let payload = {
                noteId: cardId,
                labelId: labelId
            }
            removeNoteLabel(payload)
                .then(removed => {
                    let array = this.state.notesArray
                    array.forEach((element) => {
                        element.labels.forEach((ele, index) => {
                            if (ele.id === labelId) {
                                element.labels.splice(index, 1)
                                this.setState({ notesArray: array })
                            }
                        })

                    })
                    console.log("labelremoved", removed);
                })
                .catch(err => {
                    console.log(err);

                })
        } catch (err) {
            console.log(err);

        }

    }

    addNoteLabel = (event) => {
        try {
            let data = {}
            console.log(event);

            if (event.target !== undefined) {

                data = {
                    id: event.target.id,
                    value: event.target.value
                }
            } else {
                data = {
                    id: event._id,
                    value: event.labelName
                }
            }

            let array = this.state.noteLabel;
            let remove = false;
            console.log("card", this.state.cardId)


            this.state.noteLabel.forEach((element, index) => {
                if (element.id === data.id) {
                    this.removeNoteLabel(this.state.cardId, element.id)
                    remove = true;
                    array.splice(index, 1)
                    this.setState({ noteLabel: array })
                }
            })
            if (remove == false) {
                console.log("data", data);
                console.log("state", this.state.cardId)
                let payload = {
                    noteId: this.state.cardId,
                    label: data
                }
                console.log(payload);

                addNoteLabel(payload)
                    .then(updated => {
                        let arrayNotes = this.state.notesArray
                        arrayNotes.forEach((element) => {
                            if (element._id === this.state.cardId) {
                                element.labels.push(data)
                                this.setState({ notesArray: arrayNotes })
                                console.log("updated", updated);
                                this.setState({ noteLabel: [...this.state.noteLabel, data] })
                            }

                        })
                    })
                    .catch(err => {
                        console.log(err);

                    })

            }

        } catch (err) {
            console.log(err);

        }
    }
    LabelPoper = (cardId, poper, location) => {
        try {

            this.setState({ AnchorEl: location, OptionsPoper: poper, cardId: cardId })
        } catch (err) {
            console.log(err);
        }
    }
    addLabel = (event) => {
        this.setState({
            labelListAnchor: event.currentTarget,
            labelListPoper: !this.state.labelListPoper,

        })
    }

    NoteTrash = () => {
        console.log("cardId", this.state.cardId);
        this.setState({ OptionsPoper: !this.state.OptionsPoper })
        let payload = {
            noteId: this.state.cardId
        }
        NoteTrash(payload)
            .then(deleted => {
                let arrayNotes = this.state.notesArray
                arrayNotes.forEach((element) => {
                    if (element._id === this.state.cardId) {
                        let index = arrayNotes.indexOf(element)
                        tabindex = index;
                        UndoTakeNote = arrayNotes.splice(index, 1)[0]
                        this.setState({ notesArray: arrayNotes, stackBar: true, stackBarMessage: 'Note Trashed Sucessfully', trashState: true })
                        console.log("updated", arrayNotes);


                    }
                })
                console.log(deleted);

            })
            .catch(err => {
                console.log(err);

            })

    }
    createLabelNote = async () => {
        await this.createLabel(this.state.labelValue)
        console.log("this state", this.state.newLabel);
        await this.addNoteLabel(this.state.newLabel)

    }

    createLabel = async (labelName) => {
        let payload = {
            labelName: labelName
        }
        await createLabel(payload)
            .then(createdLabel => {
                this.setState({ newLabel: createdLabel.data.data })
                let Labels = this.state.labels
                console.log("new Label", this.state.newLabel);

                Labels.push(this.state.newLabel)
                this.setState({ labels: Labels, labelListPoper: '' })

            })
            .catch(err => {
                console.log(err);

            })

    }
    handelDeleteNewLabel = () => {
        this.setState({ newLabel: '' })
    }

    filterLabel = async (event) => {
        await this.setState({ labelValue: event.target.value, searchLabels: [] })
        let filterLabel = []
        let special = /[!@#$%^&*(),.?":{}|<>]/
        // console.log("this", (this.state.labelValue.length));

        if (this.state.labelValue.length <= 0) {
            this.setState({ foundLabel: true, filterstateLabel: false })

        } else {
            if (!special.test(this.state.labelValue)) {
                let patt = new RegExp(`${this.state.labelValue}`)
                this.state.labels.forEach((element) => {

                    if (patt.test(element.labelName)) {
                        console.log("search", element.labelName);
                        filterLabel.push(element)
                    }
                })
                // console.log(filterLabel.length, this.state.labelValue.length, filterLabel[0].labelName);
                if (filterLabel.length === 0) {
                    this.setState({ foundLabel: false })

                } else {
                    if (filterLabel.length === 1 && filterLabel[0].labelName.length === this.state.labelValue.length) {
                        this.setState({ foundLabel: true }
                        )
                    } else {
                        this.setState({ foundLabel: false })
                    }
                    this.setState({ filterstateLabel: true, searchLabels: filterLabel })
                }
            }
        }
    }
    render() {
        // console.log("props", this.props.newLabel);

        return (
            <div className="Container" >
                <div>
                    <NavBar labels={this.state.labels}
                        open={this.open} refresh={this.refresh} onSearch={this.search} />
                </div>
                <div className="NotesScroll">
                    <TakeNote createNote={this.createNote} NoteArchived={this.NoteArchived} labels={this.state.labels} createLabel={this.createLabel}
                        newLabel={this.state.newLabel} handelDeleteNewLabel={this.handelDeleteNewLabel} />
                    <Notes notes={this.state.filterState ? this.state.filterArray : this.state.notesArray} view={this.state.View}
                        setValue={this.setValue} NoteReminder={this.NoteReminder} removeNoteLabel={this.removeNoteLabel}
                        LabelPoper={this.LabelPoper} newReminder={this.state.newReminder}
                    />
                </div>
                <Popper open={this.state.colorPoper} anchorEl={this.state.AnchorEl}
                    placement={'top-start'}
                    style={{ width: '100px', zIndex: '1300' }} >
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

                <Popper open={this.state.reminderPoper} anchorEl={this.state.AnchorEl} style={{ zIndex: '1300' }}>
                    <Paper>
                        <ClickAwayListener onClickAway={event => this.setState({ reminderPoper: false, AnchorEl: null })}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    onClose={() => this.setState({ reminderPoper: false, AnchorEl: null })}
                                    onChange={this.dateSet}
                                    errortext='Required'
                                />
                            </MuiPickersUtilsProvider>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <Snackbar style={{ zIndex: '1300' }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.stackBar}
                    autoHideDuration={10}
                    message={this.state.stackBarMessage}
                    action={
                        <UndoOutlined titleAccess="Undo " onClick={this.undoArchive} />
                    }
                />
                <Popper open={this.state.OptionsPoper} anchorEl={this.state.AnchorEl} placement={'bottom'} style={{ zIndex: '1300' }} >
                    <ClickAwayListener onClickAway={event => this.setState({ OptionsPoper: !this.state.OptionsPoper })} >
                        <Card className="Options">
                            <label onClick={this.NoteTrash}>
                                <IconButton style={{ borderRadius: '0px', fontSize: '10pt' }}><DeleteOutline /> Trash</IconButton></label>
                            <label onClick={event => this.setState({ OptionsPoper: !this.state.OptionsPoper, labelListPoper: !this.state.labelListPoper })}>
                                <IconButton style={{ borderRadius: '0px', fontSize: '10pt' }}> <AddCircleOutline />    Add Label</IconButton>  </label>
                        </Card>
                    </ClickAwayListener>
                </Popper>
                <Popper open={this.state.labelListPoper} anchorEl={this.state.AnchorEl} style={{ zIndex: '1300' }} style={{ zIndex: '1300' }}>
                    <ClickAwayListener onClickAway={event => this.setState({ labelListPoper: !this.state.labelListPoper, AnchorEl: null, cardId: '', labelValue: '' })} >
                        <Card className="Options-labels">
                            <label>Label List</label>
                            <TextField
                                type="text"
                                placeholder='Enter Label'
                                value={this.state.labelValue}
                                onChange={this.filterLabel}
                            />
                            <div className="listLabels">
                                {
                                    this.state.filterstateLabel ?
                                        this.state.searchLabels.length > 0 ? this.state.searchLabels.map((label) =>
                                            <div key={label._id} className="labelsCheckBox">
                                                <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} />
                                                <p></p>{label.labelName} </div>) : <label> No Label Found!!</label>
                                        :
                                        this.state.labels.map((label) =>
                                            <div key={label._id} className="labelsCheckBox">
                                                <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} />
                                                <p>{label.labelName}</p> </div>
                                        )
                                }
                            </div>
                            <div hidden={this.state.foundLabel}>
                                <hr />
                                <IconButton onClick={() => this.createLabelNote(this.state.labelValue)} > <AddCircleOutline />Create Label</IconButton>
                                <p>"{this.state.labelValue}"</p>
                            </div>

                        </Card>
                    </ClickAwayListener>
                </Popper>
            </div>

        )
    }
}
export default withRouter(DashBoard)