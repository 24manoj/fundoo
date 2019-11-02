
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : create notes componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from 'react';
import {
    InputBase, Card, Button, Popper, Paper, createMuiTheme, MuiThemeProvider, ClickAwayListener, Chip, Dialog, MenuItem, Avatar
} from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ImageOutlined, Alarm, NotificationImportantOutlined, PersonAddOutlined, ColorLensOutlined, ArchiveOutlined, MoreVertOutlined, UnarchiveOutlined } from "@material-ui/icons";
import { messageService } from '../../minddleware/middleWareServices'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateIndex } from '../../controller/notesController';
import { Collaborator } from "../DashBoard/Collaborator";
import { isThisSecond } from 'date-fns/esm';

let note = require('../../assets/noteEmpty.svg')
/**
 * @desc overrides theme 
 */
const theme = createMuiTheme({
    overrides: {
        MuiFab: {
            root: {
                width: '25px',
                height: '25px'
            }
        },
        MuiPaper: {
            elevation24: {
                boxShadow: 'none'
            },
            elevation1: {
                boxShadow: '0px 0px 20px 11px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            },
            rounded: {
                borderRadius: '14px'
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }
        }

    }
})
/**
 * @description arranges the drag and drop of an array
 */
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};



class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            NotePoper: false,
            dailogTitleValue: '',
            dailogDescvalue: '',
            cardDailog: false,
            cards: [],
            poper: false,
            anchorEl: null,
            icons: true,
            cardId: '',
            CardIdRequired: false,
            open: true,
            OptionsPoper: false,
            labelListPoper: false,
            dailogReminder: '',
            dailogLabels: [],
            dailogNoteId: '',
            dailogColor: '',
            iconsVisible: true,
            visibleCard: '',
            trashAnchorEl: null,
            trashPoper: false,
            sideNav: false,
            colldetails: [],
            collId: [],
            dailogCollaborate: {}
        }
        this.LabelList = this.LabelList.bind(this);
        messageService.getMessage().subscribe(message => {
            try {
                if (message.text.key === 'updateReminder') {
                    this.setState({
                        dailogReminder: message.text.value,
                        visibleCard: '',
                        NotePoper: false
                    })
                }
                if (message.text.key === 'updateColor') {

                    this.setState({
                        dailogColor: message.text.value,
                        visibleCard: '',
                        NotePoper: false
                    })
                }
                if (message.text.key === 'sideNav') {
                    this.setState({
                        sideNav: message.text.value
                    })
                }
                if (message.text.key === 'colldetails') {
                    let exist = false;
                    this.state.colldetails.map(ele => {

                        ele.map(e => {
                            if (e._id === message.text.value[0]._id && ele.idcol === message.text.value.idCol)
                                exist = true

                        })
                    })
                    if (!exist) {
                        this.setState({ colldetails: [...this.state.colldetails, message.text.value] })
                    }
                }

                if (message.text.key === 'updateDelete') {
                    let idArray = []
                    let array = this.state.colldetails
                    let index;
                    idArray = array.map((ele, ind) => {
                        ele.map(e => {
                            if (e._id === message.text.value) {
                                index = ind
                            }
                        })
                    })

                    let array2 = this.state.colldetails

                    let value = array2.splice(index, 1)

                    this.setState({
                        colldetails: array2,
                        dailogCollaborate: undefined

                    })
                }
            } catch (err) {
                console.log(err);

            }
        })
    }



    /**
     * @description sets note color
     */
    setNoteColor = async (event, cardId, Element) => {
        try {
            await this.setState({ poper: true, anchorEl: event.currentTarget })
            this.setState({ NotePoper: true })
            this.props.setValue(cardId, this.state.anchorEl, this.state.poper, false)
            this.props.setNoteElement(Element)
        } catch (err) {
            console.log(err);
        }
    }
    /**
        * @description unArchives archived note
        */
    NoteUnArchive = (card) => {
        try {
            messageService.sendMessage({ key: 'UnArchiveNote', value: card })
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description Archives specified noted
     */
    NoteArchived = (cardId) => {
        try {
            this.props.setValue(cardId, false, false, true)
        } catch (err) {
            console.log(err)
        }
    }/**
     * @description  removes reninder
     */
    undoReminder = (cardId, event) => {
        try {
            this.props.NoteReminder(false, null, cardId)
        } catch (err) {
            console.log(err)
        }

    }
    /**
     * @description adds reminder 
     */
    addReminder = (cardId, event) => {
        try {
            let AnchorEl = event.currentTarget
            this.setState({ NotePoper: true })
            this.props.NoteReminder(true, AnchorEl, cardId)

        } catch (err) {
            console.log(err);
        }
    }
    /**
     * @description sets poper value true
     */
    LabelList(cardId, event, element) {
        try {
            event.preventDefault()
            this.setState({ NotePoper: true })
            this.props.LabelPoper(cardId, true, event.target, element)
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description removes note label
     */
    removeNoteLabel = (cardId, labelId) => {
        try {
            this.props.removeNoteLabel(cardId, labelId)

        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description handels dailogopen
     */
    handleDailog = async (Element, event, coll) => {
        await this.setState({
            dailogNoteId: this.props.filterValue ? Element.id : Element._id,
            dailogTitleValue: Element.title,
            dailogDescvalue: Element.content,
            cardDailog: !this.state.cardDailog,
            dailogReminder: Element.reminder,
            dailogLabels: Element.labels,
            dailogColor: Element.color,
            dailogCollaborate: coll
        })

    }
    /**
         * @description handels dailogclose
         */
    handleDailogClose = () => {
        this.setState({
            dailogNoteId: '',
            dailogTitleValue: '',
            dailogDescvalue: '',
            cardDailog: !this.state.cardDailog,
            dailogReminder: '',
            dailogLabels: '',
            dailogColor: '',
            visibleCard: '',
            dailogCollaborate: {}
        })
    }

    /**
         * @description handels title
         */
    handleTitle = async (event) => {
        await this.setState({ dailogTitleValue: event.target.value })
    }

    /**
         * @description updates a notes 
         */
    updateNotes = async () => {
        try {
            let payload = {
                noteId: this.state.dailogNoteId,
                title: this.state.dailogTitleValue,
                content: this.state.dailogDescvalue,

            }
            messageService.sendMessage({ key: 'updateNotes', value: payload })
            this.setState({
                cardDailog: !this.state.cardDailog
            })
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description handels Trashoptions
     */
    handleTrashOPtions = async (cardId, event) => {
        try {

            await this.setState({ trashAnchorEl: event.currentTarget, trashPoper: !this.state.trashPoper, cardId: cardId })
        } catch (err) {
            console.log(err);

        }

    }
    /**
     * @description handels trashrestore
     */
    handleTrashRestore = async () => {
        try {
            await messageService.sendMessage({ key: 'MoreOptionsRestore', cardId: this.state.cardId })
            this.setState({ cardId: '', trashPoper: false, trashAnchorEl: null })
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description handels delete note
     */
    handleTrashDelete = async () => {
        try {
            await messageService.sendMessage({ key: 'MoreTrashOPtions', cardId: this.state.cardId })
            this.setState({ cardId: '', trashPoper: false, trashAnchorEl: null })
        } catch (err) {
            console.log(err);

        }
    }
    /**
         * @description handels DragEnd
         */
    onDragEnd = async result => {
        try {
            const { source, destination } = result;

            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId && destination !== null) {
                await reorder(
                    this.props.notes,
                    source.index,
                    destination.index
                )
                let payload = {
                    source: { id: this.props.filterValue ? this.props.notes[source.index].id : this.props.notes[source.index]._id, index: destination.index },
                    destination: { id: this.props.filterValue ? this.props.notes[destination.index].id : this.props.notes[destination.index]._id, index: source.index }
                }
                updateIndex(payload)
                    .then(updated => {
                        messageService.sendMessage({ key: 'updateIndex', value: payload })
                    })
                    .catch(err => {
                        console.log("err", err);

                    })
            }
        } catch (err) {
            console.log(err);

        }
    }
    /**
      * @description handles undo Collaborated
      */
    undoCollaborate(cardId, collId) {

        this.props.undoCollaborate(cardId, collId)
    }
    render() {
        let view = this.props.view ? 'ListView' : 'gridView'
        let cardCss = this.props.view ? 'notesCard' : 'notesCardGrid'
        let notesCss = this.props.view ? 'notes' : 'notes2'

        return (
            <MuiThemeProvider theme={theme}>
                <div className={view} >

                    {this.props.notes.length <= 0 ?
                        <div className="EmptyNote">
                            <img src={note} width="100px" height="100px" alt=" no Note " />
                            <span> :) No Notes yet !!!</span>
                        </div> :
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable" >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className='noteAlign' id={this.state.sideNav ? "transitionLeft" : ''} >
                                        <div className='noteAlign-count' >
                                            <span> Notes in {this.props.title !== undefined ? this.props.title : 'Dashboard'}:: <span style={{ fontSize: '22px' }}>{this.props.notes.length}</span></span>
                                        </div>
                                        <div className={notesCss}>
                                            {this.props.notes.map((Element, index) =>
                                                <Draggable
                                                    key={this.props.filterValue ? Element.id : Element._id}
                                                    draggableId={this.props.filterValue ? Element.id : Element._id}
                                                    index={Element.index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="space-note"
                                                        >
                                                            <Card className={cardCss} key={Element.index} id={this.props.filterValue ? Element.id : Element._id}
                                                                style={{ backgroundColor: Element.color }} onMouseEnter={event => this.setState({ visibleCard: this.props.filterValue ? Element.id : Element._id })}
                                                                onMouseLeave={event => this.state.NotePoper ? '' : this.state.trashPoper ? '' : this.setState({ visibleCard: '' })
                                                                }>
                                                                <div className="titleIcon">
                                                                    <div>
                                                                        <InputBase
                                                                            name="title"
                                                                            value={Element.title}
                                                                            tabIndex='1'
                                                                            onClick={(event) => this.handleDailog(Element, event)}
                                                                            className="text-Title"
                                                                        />
                                                                    </div>

                                                                    <img className={this.props.TrashState !== undefined ? 'IconPin-hide' : (this.state.visibleCard === (this.props.filterValue ? Element.id : Element._id) ? '' : 'IconPin-hide')}
                                                                        src={pin} style={{ opacity: '0.5' }} alt="pin" />

                                                                </div>
                                                                <div style={{ width: "100%" }}>
                                                                    <div>
                                                                        <InputBase
                                                                            name="description"
                                                                            value={Element.content}
                                                                            onClick={(event) => this.handleDailog(Element, event)}
                                                                            multiline
                                                                            className="text-desc"
                                                                        />
                                                                    </div>
                                                                    {Element.reminder !== null ?
                                                                        <Chip
                                                                            style={{ margin: '2px' }}
                                                                            icon={< Alarm />}
                                                                            label={(Element.reminder !== null ? new Date(Element.reminder).toString().slice(0, 25) : null)
                                                                            }
                                                                            onDelete={event => this.undoReminder(this.props.filterValue ? Element.id : Element._id, event)}

                                                                        />
                                                                        : ''}

                                                                    {Element.collaborated !== undefined ?
                                                                        this.state.colldetails.map(coll =>
                                                                            coll.map(c =>

                                                                                Element.collaborated.map(e =>
                                                                                    coll.idCol === e ?

                                                                                        <Avatar alt="profile" src={c.url === undefined ? coll.url : c.url} onClick={(event) => this.handleDailog(Element, event, c)}
                                                                                        />

                                                                                        : ''
                                                                                    //         : ''
                                                                                )))
                                                                        // )
                                                                        : ''}


                                                                    <div className="label-div">
                                                                        {Element.labels.length > 0 ? Element.labels.map((labelvalue) =>

                                                                            <Chip
                                                                                key={labelvalue.id}
                                                                                style={{ width: 'auto', margin: '2px' }}
                                                                                label={labelvalue.value
                                                                                }
                                                                                onDelete={() => this.removeNoteLabel((this.props.filterValue ? Element.id : Element._id), labelvalue.id)}
                                                                            />

                                                                        ) : ''}
                                                                    </div>
                                                                </div>
                                                                {this.props.TrashState === undefined ?
                                                                    <div className={this.state.visibleCard === (this.props.filterValue ? Element.id : Element._id) ? "IconsList" : "IconsList-hide"}>
                                                                        <div className='decsIcon' >
                                                                            <NotificationImportantOutlined titleAccess="Remind me" style={{ zIndex: '999' }} onClick={(event) => this.addReminder(this.props.filterValue ? Element.id : Element._id, event)} />
                                                                            <Collaborator notes={this.props.notes} cardId={this.props.filterValue ? Element.id : Element._id} />

                                                                            <ColorLensOutlined titleAccess="change Color"
                                                                                onClick={(event) => this.setNoteColor(event, this.props.filterValue ? Element.id : Element._id, Element)} />
                                                                            <ImageOutlined titleAccess=" Add Image" />
                                                                            {this.props.ArchiveState ?
                                                                                <UnarchiveOutlined titleAccess='Unarchive Note' onClick={() => this.NoteUnArchive(Element)} />
                                                                                :
                                                                                <ArchiveOutlined titleAccess=" Archive Note"
                                                                                    onClick={() => this.NoteArchived(this.props.filterValue ? Element.id : Element._id)} />
                                                                            }
                                                                            <MoreVertOutlined titleAccess="More"
                                                                                onClick={(event) => this.LabelList(this.props.filterValue ? Element.id : Element._id, event, Element)}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className={this.state.visibleCard === Element._id ? 'IconsList' : this.state.trashPoper && this.state.visibleCard === Element._id ? 'IconsList' : 'IconsList-hide'}>
                                                                        <MoreVertOutlined titleAccess="More" onClick={(event) => this.handleTrashOPtions(Element._id, event)} />
                                                                    </div>}
                                                            </Card>
                                                        </div>)}
                                                </Draggable>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    } </div>

                <div>
                    <Popper open={this.state.trashPoper} anchorEl={this.state.trashAnchorEl} placement={'bottom'} >
                        <ClickAwayListener onClickAway={event => this.setState({ trashAnchorEl: null, trashPoper: false, visibleCard: '' })}>
                            <Paper>
                                <MenuItem onClick={this.handleTrashDelete} > Delete Forever </MenuItem>
                                <MenuItem onClick={this.handleTrashRestore}> Restore</MenuItem>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
                <Dialog open={this.props.TrashState ? false : this.state.cardDailog} onClose={this.handleDailogClose}  >
                    <div className='DailogCard' style={{ backgroundColor: this.state.dailogColor }}>
                        <div className="titleIcon">
                            <div>
                                <InputBase
                                    name="title"
                                    type="text"
                                    value={this.state.dailogTitleValue}
                                    onChange={this.handleTitle}
                                    className="text-Title"
                                />
                            </div>
                            <div >
                                <img className='IconPin' src={pin} alt="pin" />
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div>
                                <InputBase
                                    name="description"
                                    type="text"
                                    value={this.state.dailogDescvalue}
                                    onChange={event => this.setState({ dailogDescvalue: event.target.value })}
                                    multiline
                                    className="text-desc"

                                />
                            </div>
                            {this.state.dailogReminder !== null ?
                                <div >
                                    <Chip
                                        style={{ width: 'auto' }}
                                        icon={<Alarm />}
                                        label={(this.state.dailogReminder !== null ? new Date(this.state.dailogReminder).toString().slice(0, 25) : null)
                                        }
                                        onDelete={event => this.undoReminder(this.state.dailogNoteId, event)}

                                    />
                                </div> : ''}
                            {this.state.dailogLabels.length > 0 ? this.state.dailogLabels.map((labelvalue) =>
                                <Chip
                                    key={labelvalue.id}
                                    style={{ width: 'auto' }}
                                    label={labelvalue.value
                                    }
                                    onDelete={() => this.removeNoteLabel(this.state.dailogNoteId, labelvalue.id)}
                                />
                            ) : ''}
                            {this.state.dailogCollaborate !== undefined ?
                                <Chip
                                    key={this.state._id}
                                    avatar={<Avatar alt="profile" src={this.state.dailogCollaborate.url} />}
                                    label={this.state.dailogCollaborate.email
                                    }
                                    onDelete={event => this.undoCollaborate(this.state.dailogNoteId, this.state.dailogCollaborate._id)} />
                                : ''}
                        </div>
                        <div className="IconsList">
                            <div className="decsIcon">
                                <NotificationImportantOutlined titleAccess="Remind me" onClick={(event) => this.addReminder(this.state.dailogNoteId, event)} />
                                <Collaborator notes={this.props.notes} cardId={this.state.dailogNoteId} />
                                <ColorLensOutlined titleAccess="change Color"
                                    onClick={(event) => this.setNoteColor(event, this.state.dailogNoteId)} />
                                <ImageOutlined titleAccess=" Add Image" />
                                <ArchiveOutlined titleAccess=" Archive Note"
                                    onClick={() => this.NoteArchived(this.state.dailogNoteId)} />
                                <MoreVertOutlined titleAccess="More"
                                    onClick={(event) => this.LabelList(this.state.dailogNoteId, event)}
                                />
                            </div>
                            <div>
                                <Button onClick={this.updateNotes} style={{ opacity: 0.8 }} >
                                    Close
                                </Button>
                            </div>

                        </div>

                    </div>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}
export default Notes;