
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a Dashboard component
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from "react";
import NavBar from '../components/DashBoard/NavBar';
import TakeNote from '../components/DashBoard/TakeNote';
import Notes from '../components/DashBoard/Notes';
import { withRouter } from 'react-router-dom';
import { Popper, Paper, ClickAwayListener, IconButton, Snackbar, Card, TextField, Checkbox, Button, createMuiTheme, MuiThemeProvider, MenuItem } from "@material-ui/core";
import { UndoOutlined, DeleteOutline, AddCircleOutline, Done } from '@material-ui/icons'
import {
    getLabels, getNotes, updateColor, updateArchive, createNote, UndoArchive, updateReminder, undoReminder,
    removeNoteLabel, addNoteLabel, NoteTrash, undoTrash, createLabel, collaborateRemove
} from '../controller/notesController';
import '../App.scss'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { messageService } from '../minddleware/middleWareServices';
import { checkCollaborated } from '../controller/userController'
var Alllabels;
var AllNotes;
var UndoTakeNote;
let check = [];
const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            gutters: {
                paddingLeft: '5px',
                opacity: 0.7
            }
        }
    }
})
class DashBoard extends Component {
    constructor(props) {
        super(props);
        /**@description declaring state and props */
        this.state = {
            filterArray: [],
            notesArray: [],
            noteLabel: [],
            labels: [],
            filterTrash: [],
            filterArchive: [],
            newReminder: '',
            trashArray: [],
            archiveArray: [],
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
            unArchive: '',
            stackBar: false,
            found: true,
            stackBarMessage: '',
            OptionsPoper: false,
            labelListPoper: false,
            reminderPoper: false,
            trashState: false,
            archiveStateComponent: false,
            foundLabel: true,
            noteExistingLabels: [],
            poperValue: false,
            colorPalette: [
                {
                    name: "default",
                    colorCode: "#FDFEFE"
                },
                {
                    name: "Red",
                    colorCode: "#f28b82"
                },
                {
                    name: "Cyan",
                    colorCode: "#80deea"
                },
                {
                    name: "orange",
                    colorCode: "#fbbc04"
                },
                {
                    name: "Tea",
                    colorCode: "#a7ffeb"
                },
                {
                    name: "LightBlue",
                    colorCode: "#90caf9"
                },
                {
                    name: "Purple",
                    colorCode: "#b39ddb"
                },
                {
                    name: "Yellow",
                    colorCode: "#fff475"
                },
                {
                    name: "litegreen",
                    colorCode: "#1AE55B"
                },
                {
                    name: "Pink",
                    colorCode: " #f48fb1"
                },
                {
                    name: "gray",
                    colorCode: "#e8eaed"
                },
                {
                    name: "Brown",
                    colorCode: "#bcaaa4"
                }
            ]
        }
        /** @description binding memberfunctions  */
        this.open = this.open.bind(this);
        this.search = this.search.bind(this);
        /** @description rxjs Observer  for data sharing*/
        messageService.getMessage().subscribe(message => {
            if (message.text.key === 'updateNotes' && message.text.key !== undefined) {
                let index = this.state.filterState ? this.state.filterArray.map(ele => ele.id).indexOf(message.text.value.noteId) :
                    this.state.notesArray.map(ele => ele._id).indexOf(message.text.value.noteId)
                let array = this.state.filterState ? this.state.filterArray : this.state.notesArray;
                array[index].title = message.text.value.title
                array[index].content = message.text.value.content
                this.state.filterState ? this.setState({ filterArray: array }) :
                    this.setState({
                        notesArray: array
                    })
            }
            if (message.text.key === 'labelDeleted') {
                this.setState({ labels: message.text.value })
            }
            if (message.text.key === 'labelEdited') {
                this.setState({ labels: message.text.value })
            }
            if (message.text.key === 'labelCreated') {
                this.setState({ labels: message.text.value })
            }
            if (message.text.key === 'updateIndex') {

                let array = this.state.filterState ? this.state.filterArray : this.state.notesArray

                let index1 = array.map(ele => this.state.filterState ? ele.id : ele._id).indexOf(message.text.value.source.id)

                array[index1].index = message.text.value.source.index
                let index2 = array.map(ele => this.state.filterState ? ele.id : ele._id).indexOf(message.text.value.destination.id)
                array[index2].index = message.text.value.destination.index
                let newArray2 = array.sort((a, b) => {
                    return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
                })
                this.state.filterState ? this.setState({ filterArray: newArray2 }) :
                    this.setState({ notesArray: newArray2 })
            }
        })
    }
    /** @description loaded after render  */
    async componentDidMount() {
        await getLabels().then(labels => {
            Alllabels = labels.data.data;
            this.setState({
                labels: Alllabels
            })
        })
            .catch(err => {
                console.log((err));

            })
        await getNotes().then(notes => {
            // let colldetails = []

            AllNotes = notes.data.data;
            AllNotes.sort((a, b) => {
                return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
            })
            AllNotes.map(ele => {
                if (ele.collaborated.length > 0) {
                    // console.log("collabroated", ele.collaborated[0]);

                    checkCollaborated({ id: ele.collaborated[0] })
                        .then(data => {
                            data.data.data.idCol = ele.collaborated[0]
                            messageService.sendMessage({ key: 'colldetails', value: data.data.data })

                        })
                        .catch(err => {
                            console.log(err);

                        })


                }

            })

            this.setState({
                notesArray: AllNotes
            })
        }).catch(err => {
            console.log(err);

        })
    }
    /**
     * @desc  sets sidenav state 
     * @param toggle boolean value 
    */
    open(toggle) {
        this.setState({ View: toggle })
    }
    /**
    * @desc  animates the refresh button on click
    * @param animate boolean value
    */
    refresh = (animate) => {
        try {
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
                    AllNotes.sort((a, b) => {
                        return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
                    })
                    this.setState({
                        notesArray: AllNotes
                    })

                }).catch(err => {
                    console.log(err);

                })
            }
        } catch (err) {
            console.log(err);

        }
    }

    /**
       * @desc  sharing data between child to parent using props
       * @param cardId  noteId
       * @param anchorEl location of current div
       * @param poper boolean value
       * @param Archive boolean value
      */

    setValue = async (cardId, anchorEl, poper, Archive) => {
        try {
            await this.setState({ cardId: cardId, AnchorEl: anchorEl, colorPoper: poper, Archive: Archive })
            if (this.state.Archive === true) {
                this.noteArchive()
            }
            if (this.props.ArchiveComponent !== undefined) {
                this.setState({ archiveStateComponent: this.props.ArchiveComponent.archive })
            }
        } catch (err) {
            console.log(err);

        }
    }
    /** 
     * @description updates the archive state of note
     */
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

    /**
       * @desc  sets color  for note
       * @param event   event handler
       * */
    setNoteColor = async (event) => {
        try {
            await this.setState({ NoteColor: event.target.value })
            let payload = {
                color: this.state.NoteColor,
                noteId: this.state.cardId
            }
            updateColor(payload)
                .then(updated => {
                    if (this.state.archiveStateComponent) {
                        this.props.color(this.state.NoteColor, this.state.cardId)
                        this.setState({
                            NoteColor: '',
                            AnchorEl: null,
                            cardId: '',
                            reminderPoper: false,
                            colorPoper: false
                        })
                    }
                    else {
                        let array1 = this.state.filterState ? this.state.filterArray : this.state.notesArray;
                        let index = array1.map(ele => this.state.filterState ? ele.id : ele._id).indexOf(this.state.cardId)
                        let array = this.state.filterState ? this.state.filterArray : this.state.notesArray;
                        array[index].color = this.state.NoteColor;
                        if (this.state.filterState) {
                            this.setState({ filterArray: array })
                        }
                        this.setState({ notesArray: array })
                        this.setState({
                            NoteColor: '',
                            AnchorEl: null,
                            cardId: '',
                            reminderPoper: false,
                            colorPoper: false
                        })
                        messageService.sendMessage({ key: 'updateColor', value: array[index].color })
                    }
                })

        } catch (err) {
            console.log(err);
        }
    }
    /**
       * @desc  creates a new note
       * @param payload contains the details of note to create
       */
    createNote = (payload) => {
        try {
            createNote(payload)
                .then(note => {
                    let array = this.state.notesArray;
                    if (payload.Archive === false) {
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
                    console.log(err)
                })
        } catch (err) {
            console.log(err);

        }
    }
    /**
       * @desc  removes reminder from a specific note
       * @param reminderpoper conatins boolean value
       * @param anchorEl location of current div
       * @param noteId Id of note to be updated
      */
    NoteReminder = async (reminderPoper, anchorEl, noteId) => {
        try {
            await this.setState({ reminderPoper: reminderPoper, AnchorEl: anchorEl, cardId: noteId })
            if (!this.state.reminderPoper) {
                let payload = {
                    noteId: this.state.cardId
                }
                undoReminder(payload)
                    .then(removedReminder => {
                        if (this.state.archiveStateComponent) {
                            this.props.reminder(this.state.notesArray, null, this.state.cardId)
                        } else {
                            let array2 = this.state.filterState ? this.state.filterArray : this.state.notesArray
                            let index = array2.map(ele => this.state.filterState ? ele.id : ele._id).indexOf(this.state.cardId)
                            let array = this.state.filterState ? this.state.filterArray : this.state.notesArray
                            array[index].reminder = null;
                            this.state.filterState ? this.setState({ filterArray: array }) :
                                this.setState({ notesArray: array, cardId: '' })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        } catch (err) {
            console.log(err);
        }
    }
    /** 
       * @desc  add reminder to note
       * @param dateTime reminder value
      */
    dateSet = (dateTime) => {
        try {
            let payload = {
                reminder: dateTime,
                noteId: this.state.cardId
            }
            updateReminder(payload)
                .then(reminder => {
                    if (this.state.archiveStateComponent) {
                        this.props.reminder(this.state.notesArray, dateTime, this.state.cardId)
                        this.setState({
                            cardId: '',
                            dateTime: '',
                            AnchorEl: null,
                            reminderPoper: false
                        })
                    } else {
                        let index = (this.state.filterState ? this.state.filterArray : this.state.notesArray).map(ele => this.state.filterState ? ele.id : ele._id).indexOf(this.state.cardId)
                        let array = this.state.filterState ? this.state.filterArray : this.state.notesArray;
                        array[index].reminder = new Date(dateTime + 1).toString().slice(0, 25);
                        messageService.sendMessage({ key: 'updateReminder', value: (new Date(dateTime + 1).toString().slice(0, 25)) })
                        if (this.state.filterState) {
                            this.setState({
                                reminderPoper: false,
                                filterArray: array,
                                cardId: '',
                                dateTime: '',
                                AnchorEl: null,
                                newReminder: array[index].reminder
                            })
                        } else {
                            this.setState({
                                notesArray: array,
                                cardId: '',
                                dateTime: '',
                                AnchorEl: null,
                                newReminder: array[index].reminder
                            })
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

    /**
       * @desc  removes note from archive state of note
      */
    undoArchive = () => {
        try {
            let payload = {
                noteId: this.state.filterState ? UndoTakeNote.id : UndoTakeNote._id
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
        } catch (err) {
            console.log(err);
        }
    }
    /**
        * @desc  remove label from note
        * @param cardId  noteId
        * @param labelId labelID
        */
    removeNoteLabel = (cardId, labelId) => {
        try {
            let payload = {
                noteId: cardId,
                labelId: labelId
            }
            removeNoteLabel(payload)
                .then(removed => {
                    if (this.state.archiveStateComponent)
                        this.props.removeNoteLabel(labelId)
                    else {
                        let array = this.state.filterState ? this.state.filterArray : this.state.notesArray
                        array.forEach((element) => {
                            element.labels.forEach((ele, index) => {
                                if (ele.id === labelId) {
                                    element.labels.splice(index, 1)
                                    this.state.filterState ? this.setState({ filterArray: array }) :
                                        this.setState({ notesArray: array })
                                }
                            })

                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

    /**
        * @desc  add label to specific note
        * @param cardId  noteId
       */
    addNoteLabel = (event) => {
        try {

            let data = {}
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
            this.state.noteLabel.forEach((element, index) => {
                if (element.id === data.id) {
                    this.removeNoteLabel(this.state.cardId, element.id)
                    remove = true;
                    array.splice(index, 1)
                    this.setState({ noteLabel: array })
                }
            })
            if (remove === false) {
                let payload = {
                    noteId: this.state.cardId,
                    label: data
                }
                addNoteLabel(payload)
                    .then(updated => {
                        if (this.state.archiveStateComponent) {
                            this.props.addNoteLabel(data, this.state.cardId)
                            this.setState({ noteLabel: [...this.state.noteLabel, data] })
                        } else {
                            let arrayNotes = this.state.filterState ? this.state.filterArray : this.state.notesArray
                            arrayNotes.forEach((element) => {
                                if ((this.state.filterState ? element.id : element._id) === this.state.cardId) {
                                    element.labels.push(data)
                                    if (this.state.filterState) {
                                        this.setState({ filterArray: arrayNotes })
                                        this.setState({ noteLabel: [...this.state.noteLabel, data] })
                                    } else {
                                        this.setState({ notesArray: arrayNotes })
                                        this.setState({ noteLabel: [...this.state.noteLabel, data] })
                                    }
                                }
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        } catch (err) {
            console.log(err);
        }
    }
    /**
        * @desc  sets labelpoper state
        * @param cardId  noteId
        * @param poper boolean value
        * @param location anchorEl of div
       */

    LabelPoper = async (cardId, poper, location, element) => {
        try {
            await this.setState({ AnchorEl: location, OptionsPoper: poper, cardId: cardId, noteLabel: element.labels })
            check = this.state.noteLabel
        } catch (err) {
            console.log(err);
        }
    }
    /** 
        * @desc adds label  
        * @param event handler        
        */

    addLabel = (event) => {
        this.setState({
            labelListAnchor: event.currentTarget,
            labelListPoper: !this.state.labelListPoper,

        })
    }
    /**
        * @desc  moves note to trash
    */

    NoteTrash = () => {
        try {
            this.setState({ OptionsPoper: !this.state.OptionsPoper })
            let payload = {
                noteId: this.state.cardId
            }
            NoteTrash(payload)
                .then(deleted => {
                    // console.log("filter state", this.state.filterState);

                    let arrayNotes = this.state.filterState ? this.state.filterArray : this.state.notesArray
                    arrayNotes.forEach((element) => {
                        if (this.state.archiveStateComponent) {
                            this.props.Trash(element)
                            this.setState({ stackBar: true, stackBarMessage: 'Note Trashed Sucessfully', trashState: true })

                        } else {
                            if (this.state.filterState ? element.id : element._id === this.state.cardId) {
                                let index = arrayNotes.indexOf(element)
                                UndoTakeNote = arrayNotes.splice(index, 1)[0]
                                if (this.state.filterState) {
                                    this.setState({ filterArray: arrayNotes })
                                }
                                this.setState({ notesArray: arrayNotes, stackBar: true, stackBarMessage: 'Note Trashed Sucessfully', trashState: true })
                            }
                        }
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
      * @desc creates a new label and adds to note
     */
    createLabelNote = async () => {
        try {
            await this.createLabel(this.state.labelValue)
            await this.addNoteLabel(this.state.newLabel)
            this.setState({ filterstateLabel: false, labelValue: '' })
        } catch (err) {
            console.log(err);
        }
    }
    /**
      * @desc  creates a new label
      * @param labelname name of  label to create
     */
    createLabel = async (labelName) => {
        try {
            let payload = {
                labelName: labelName
            }
            await createLabel(payload)
                .then(createdLabel => {
                    this.setState({ newLabel: createdLabel.data.data })
                    let Labels = this.state.labels
                    Labels.push(this.state.newLabel)
                    this.setState({ labels: Labels, labelListPoper: '' })
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    }
    /**
      * @desc  remove new label
     */
    handelDeleteNewLabel = () => {
        this.setState({ newLabel: '' })
    }
    /**
      * @desc  search function for labels ,filters labels on search
      * @param event event handler
     */
    filterLabel = async (event) => {
        await this.setState({ labelValue: event.target.value, searchLabels: [] })
        let filterLabel = []
        let special = /[!@#$%^&*(),.?":{}|<>]/
        if (this.state.labelValue.length <= 0) {
            this.setState({ foundLabel: true, filterstateLabel: false })
        } else {
            if (!special.test(this.state.labelValue)) {
                let patt = new RegExp(`${this.state.labelValue}`)
                this.state.labels.forEach((element) => {
                    if (patt.test(element.labelName)) {
                        filterLabel.push(element)
                    }
                })
                if (filterLabel.length === 0) {
                    this.setState({ foundLabel: false })
                } else {
                    if (filterLabel.length === 1 && filterLabel[0].labelName.length === this.state.labelValue.length) {
                        this.setState({ foundLabel: true })
                    } else {
                        this.setState({ foundLabel: false })
                    }
                    this.setState({ filterstateLabel: true, searchLabels: filterLabel })
                }
            }
        }
    }
    /**
      * @desc  filters notes array for reminder
     */
    getReminderNotes = () => {
        let array = this.state.notesArray.filter(ele => ele.reminder !== null)
        return array
    }
    /**
      * @desc  filters for specific filter labels
      */
    getLabelNotes = () => {
        try {

            let array = []
            //eslint-disable-next-line
            this.state.notesArray.map(ele => {
                ele.labels.forEach(label => {
                    if (label.value === this.props.LabelsState.title)
                        array.push(ele)
                })
            })
            return array

        } catch (err) {
            console.log(err);

        }
    }
    /**
      * @desc updates notes array
       */
    updatedArray = () => {
        try {
            let array = this.state.notesArray
            array.push(this.props.updatedArray)
            this.setState({
                notesArray: array
            })
            return this.state.notesArray
        } catch (err) {
            console.log(err);

        }
    }
    /**
      * @desc  sends archived data to child
     */
    setArchive = () => {
        try {
            if (this.props.ArchiveNotes !== undefined) {
                if (this.state.filterState) {
                    this.setState({
                        filterArray: this.props.ArchiveNotes
                    })
                } else {

                    this.setState({
                        notesArray: this.props.ArchiveNotes
                    })
                }
                return this.props.ArchiveNotes
            }
        } catch (err) {
            console.log(err);

        }
    }
    /**
      * @desc  sets filtered array on search
      * @param state  boolean value
      * @param filt notes of searched
      * @param trash trash search notes
      * @param archive archive notes
     */
    search = (state, filt, trash, archive) => {
        this.setState({ filterState: state, filterArray: filt, filterTrash: trash, filterArchive: archive })
    }
    setNoteElement = (Element) => {
        this.setState({ NoteColor: Element.color })
    }
    undoCollaborate = (noteId, collId) => {
        try {
            let payload = {
                noteId: noteId,
                collId: collId
            }
            collaborateRemove(payload)
                .then(data => {
                    console.log(data);

                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);

        }
    }

    render() {
        const title = this.props.reminder !== undefined ? this.props.reminder.title :
            (this.props.ArchiveComponent !== undefined ? this.props.ArchiveComponent.title
                : (this.props.TrashState !== undefined ? this.props.TrashState.title :
                    (this.props.LabelsState !== undefined ? this.props.LabelsState.title : undefined)))
        const stateReminder = this.props.reminder !== undefined ? this.props.reminder.reminder : undefined
        const stateArchive = this.props.ArchiveComponent !== undefined ? this.props.ArchiveComponent.archive : undefined
        const stateTrash = this.props.TrashState !== undefined ? this.props.TrashState.Trash : undefined
        const stateLabel = this.props.LabelsState !== undefined ? this.props.LabelsState.labels : undefined
        const arciveTitle = this.props.ArchiveComponent !== undefined ? this.props.ArchiveComponent.title : undefined


        return (
            <MuiThemeProvider theme={theme}>
                <div className="Container" >
                    <div>
                        <NavBar labels={this.state.labels}
                            open={this.open} refresh={this.refresh} search={this.search} title={this.props.ArchiveComponent !== undefined ? arciveTitle : title} />
                    </div>
                    <div className="NotesScroll" >
                        <TakeNote ArchiveState={stateArchive} createNote={this.createNote} NoteArchived={this.NoteArchived} labels={this.state.labels} createLabel={this.createLabel}
                            newLabel={this.state.newLabel} handelDeleteNewLabel={this.handelDeleteNewLabel} TrashState={stateTrash} />
                        {stateReminder ?
                            <Notes notes={this.state.filterState ? this.state.filterArray : this.getReminderNotes()} view={this.state.View}
                                setValue={this.setValue} NoteReminder={this.NoteReminder} removeNoteLabel={this.removeNoteLabel}
                                LabelPoper={this.LabelPoper} newReminder={this.state.newReminder} filter={this.state.filterState}
                                setNoteElement={this.setNoteElement} undoCollaborate={this.undoCollaborate}

                                title={this.props.ArchiveComponent !== undefined ? arciveTitle : title} />
                            : (stateArchive ?

                                <Notes notes={this.state.filterState ? this.state.filterArchive : this.props.ArchiveNotes} view={this.state.View} ArchiveState={stateArchive}
                                    setValue={this.setValue} NoteReminder={this.NoteReminder} removeNoteLabel={this.removeNoteLabel}
                                    LabelPoper={this.LabelPoper} newReminder={this.state.newReminder} filter={this.state.filterState}
                                    title={this.props.ArchiveComponent !== undefined ? arciveTitle : title} setNoteElement={this.setNoteElement}
                                    undoCollaborate={this.undoCollaborate}


                                />
                                :
                                (stateTrash ?
                                    <Notes notes={this.state.filterState ? this.state.filterTrash : this.props.TrashNotes} view={this.state.View} TrashState={stateTrash}
                                        title={this.props.ArchiveComponent !== undefined ? arciveTitle : title}


                                    />
                                    : (
                                        stateLabel ?
                                            <Notes notes={this.getLabelNotes()} view={this.state.View}
                                                setValue={this.setValue} NoteReminder={this.NoteReminder} removeNoteLabel={this.removeNoteLabel}
                                                LabelPoper={this.LabelPoper} newReminder={this.state.newReminder} filter={this.state.filterState}
                                                title={this.props.ArchiveComponent !== undefined ? arciveTitle : title} setNoteElement={this.setNoteElement}
                                                undoCollaborate={this.undoCollaborate}


                                            />
                                            :
                                            <Notes notes={this.state.filterState ? this.state.filterArray : (this.props.updatedArray !== undefined ? this.updateArray : this.state.notesArray)} view={this.state.View}
                                                setValue={this.setValue} NoteReminder={this.NoteReminder} removeNoteLabel={this.removeNoteLabel}
                                                LabelPoper={this.LabelPoper} newReminder={this.state.newReminder} filterValue={this.state.filterState}
                                                title={this.props.ArchiveComponent !== undefined ? arciveTitle : title} setNoteElement={this.setNoteElement}
                                                undoCollaborate={this.undoCollaborate}


                                            />)))
                        }
                    </div>
                    <Popper open={this.state.colorPoper} anchorEl={this.state.AnchorEl}
                        placement={'top-start'}
                        style={{ width: '100px', zIndex: '1300' }} >
                        <ClickAwayListener onClickAway={event => this.setState({ colorPoper: false })}>
                            <Paper style={{ width: '135px' }} >
                                {this.state.colorPalette.map((code, index) =>
                                    <IconButton
                                        key={index}
                                        className='colorstyle'
                                        style={{ backgroundColor: code.colorCode }}
                                        title={code.name}
                                        onClick={this.setNoteColor} value={code.colorCode} >
                                        {this.state.NoteColor === code.colorCode ? <Done style={{ width: '20px', position: 'absolute' }} /> : ''}
                                    </IconButton>
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
                                <label onClick={this.NoteTrash} style={{ width: '100%' }}>
                                    <MenuItem id="notesOPtions" ><DeleteOutline /> Trash</MenuItem></label>
                                <label onClick={event => this.setState({ OptionsPoper: !this.state.OptionsPoper, labelListPoper: !this.state.labelListPoper })} style={{ width: '100%' }}>
                                    <MenuItem className='notesOPtions'> <AddCircleOutline />    Add Label</MenuItem>  </label>
                            </Card>
                        </ClickAwayListener>
                    </Popper>
                    <Popper open={this.state.labelListPoper} anchorEl={this.state.AnchorEl} placement={'bottom'} style={{ zIndex: '1300' }}>
                        <ClickAwayListener onClickAway={event => this.setState({ labelListPoper: !this.state.labelListPoper, filterstateLabel: false, AnchorEl: null, cardId: '', labelValue: '', foundLabel: true })} >
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
                                            this.state.searchLabels.length > 0 ? (this.state.searchLabels.map((label) =>
                                                <div key={label._id} className="labelsCheckBox" >
                                                    {
                                                        check.filter(ele => ele.id === label._id).length > 0 ?
                                                            <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} checked
                                                            /> :
                                                            <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel} />

                                                    }
                                                    <span>{label.labelName} </span></div>)) : <label style={{ margin: '10px' }}> No Label Found!!</label>
                                            :
                                            this.state.labels.map((label) =>
                                                <div key={label._id} className="labelsCheckBox">
                                                    {
                                                        check.map(ele => ele.id).indexOf(label._id) !== -1 ?
                                                            <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel}
                                                                checked
                                                            /> :
                                                            <Checkbox color="primary" value={label.labelName} id={label._id} onChange={this.addNoteLabel}
                                                            />
                                                    }
                                                    <p>{label.labelName}</p> </div>)
                                    }
                                </div>
                                <div hidden={this.state.foundLabel}>
                                    <hr />
                                    <Button onClick={() => this.createLabelNote(this.state.labelValue)} > <AddCircleOutline />Create Label </Button>                            </div>
                            </Card>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default withRouter(DashBoard)