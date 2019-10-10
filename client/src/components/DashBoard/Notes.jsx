import React, { Component } from 'react';
import {
    InputBase, Card, Button, Popper, Paper, Fade, Fab, createMuiTheme, MuiThemeProvider, IconButton, ClickAwayListener, Chip, TextField, Checkbox, Dialog
} from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ImageOutlined, Alarm, NotificationImportantOutlined, PersonAddOutlined, ColorLensOutlined, ArchiveOutlined, Label, MoreVertOutlined } from "@material-ui/icons";
import { messageService } from '../../minddleware/middleWareServices'



const theme = createMuiTheme({
    overrides: {
        MuiFab: {
            root: {
                width: '25px',
                height: '25px'
            }
        }, MuiPaper: {
            elevation24: {
                boxShadow: 'none'
            },
            rounded: {
                borderRadius: '20px'

            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }
        }
    }
})

class Notes extends Component {
    constructor(props) {
        super(props)
        // console.log('Allnotes', this.props)
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
            visibleCard: ''
        }
        this.LabelList = this.LabelList.bind(this);
        messageService.getMessage().subscribe(message => {
            console.log('in notes controller', message.text.key);

            if (message.text.key === 'updateReminder') {
                this.setState({
                    dailogReminder: message.text.value
                })
            }
            if (message.text.key === 'updateColor') {
                this.setState({
                    dailogColor: message.text.value
                })
            }

        })
    }

    setNoteColor = async (event, cardId) => {
        await this.setState({ poper: true, anchorEl: event.currentTarget })
        this.setState({ NotePoper: true })
        this.props.setValue(cardId, this.state.anchorEl, this.state.poper, false)
    }

    NoteArchived = (cardId) => {
        try {
            this.props.setValue(cardId, false, false, true)
        } catch (err) {
            console.log(err)
        }
    }
    undoReminder = (cardId, event) => {
        try {
            this.props.NoteReminder(false, null, cardId)
        } catch (err) {
            console.log(err)
        }

    }
    addReminder = (cardId, event) => {
        try {
            let AnchorEl = event.currentTarget
            this.setState({ NotePoper: true })
            this.props.NoteReminder(true, AnchorEl, cardId)

        } catch (err) {
            console.log(err);
        }
    }
    LabelList(cardId, event) {
        this.setState({ NotePoper: true })
        this.props.LabelPoper(cardId, true, event.target)
    }

    removeNoteLabel = (cardId, labelId) => {
        try {
            this.props.removeNoteLabel(cardId, labelId)

        } catch (err) {
            console.log(err);

        }
    }
    handleDailog = async (Element, event) => {
        await this.setState({
            dailogNoteId: Element._id,
            dailogTitleValue: Element.title,
            dailogDescvalue: Element.content,
            cardDailog: !this.state.cardDailog,
            dailogReminder: Element.reminder,
            dailogLabels: Element.labels,
            dailogColor: Element.color
        })

    }

    handleDailogClose = () => {
        this.setState({
            dailogNoteId: '',
            dailogTitleValue: '',
            dailogDescvalue: '',
            cardDailog: !this.state.cardDailog,
            dailogReminder: '',
            dailogLabels: '',
            dailogColor: ''
        })
    }


    handleTitle = async (event) => {
        await this.setState({ dailogTitleValue: event.target.value })
    }


    updateNote = () => {
        let payload = {
            id: this.state.dailogNoteId,
            title: this.state.dailogTitleValue,
            content: this.state.dailogDescvalue
        }

    }

    updateNotes = async () => {
        let payload = {
            noteId: this.state.dailogNoteId,
            title: this.state.dailogTitleValue,
            content: this.state.dailogDescvalue,

        }
        messageService.sendMessage({ key: 'updateNotes', value: payload })
        this.setState({
            cardDailog: !this.state.cardDailog
        })

    }
    render() {
        let cardCss = this.props.view ? 'ListView' : 'notesCard'
        console.log("notes", this.props.notes);

        return (
            <MuiThemeProvider theme={theme}>
                <div className="notesContainer" >
                    {this.props.notes.length <= 0 ?
                        <div className="searchNote">
                            No Note Found!!!!
                        </div> :
                        this.props.notes.map((Element) =>
                            <Card className={cardCss} key={Element._id} id={Element._id}
                                style={{ backgroundColor: Element.color, padding: '10px' }} onMouseEnter={event => this.setState({ visibleCard: Element._id })}
                                onMouseLeave={event => this.state.NotePoper ? '' : this.setState({ visibleCard: '' })}>

                                <div className="titleIcon">
                                    <div >
                                     
                                        <InputBase
                                            name="title"
                                            type="text"
                                            value={Element.title}
                                            tabIndex='1'
                                            onClick={(event) => this.handleDailog(Element, event)}
                                        />
                                    </div>

                                    <div hidden={this.state.visibleCard === Element._id ? false : true} >

                                        <img className='IconPin' src={pin} />
                                    </div>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div>
                                        <InputBase
                                            name="description"
                                            type="text"
                                            value={Element.content}
                                            onClick={(event) => this.handleDailog(Element, event)}
                                            multiline />
                                    </div>
                                    {Element.reminder !== null ?
                                        <div >
                                            <Chip
                                                style={{ width: 'auto' }}
                                                icon={<Alarm />}
                                                label={(Element.reminder !== null ? new Date(Element.reminder).toString().slice(0, 15) : null)
                                                }
                                                onDelete={event => this.undoReminder(Element._id, event)}

                                            />
                                        </div> : ''}
                                    {Element.labels.length > 0 ? Element.labels.map((labelvalue) =>
                                        <Chip
                                            key={labelvalue.id}
                                            style={{ width: 'auto' }}
                                            label={labelvalue.value
                                            }
                                            onDelete={() => this.removeNoteLabel(Element._id, labelvalue.id)}
                                        />
                                    ) : ''}
                                </div>
                                <div hidden={this.state.visibleCard === Element._id ? false : true} >
                                    <div className="IconsList" >
                                        <div className='decsIcon' >
                                            <NotificationImportantOutlined titleAccess="Remind me" style={{ zIndex: '999' }} onClick={(event) => this.addReminder(Element._id, event)} />
                                            <PersonAddOutlined titleAccess="Collaborate" />
                                            <ColorLensOutlined titleAccess="change Color"
                                                onClick={(event) => this.setNoteColor(event, Element._id)} />
                                            <ImageOutlined titleAccess=" Add Image" />
                                            <ArchiveOutlined titleAccess=" Archive Note"
                                                onClick={() => this.NoteArchived(Element._id)} />
                                            <MoreVertOutlined titleAccess="More"
                                                onClick={(event) => this.LabelList(Element._id, event)}

                                            />
                                        </div>


                                    </div>
                                </div>

                            </Card>


                        )}


                </div>

                <Dialog open={this.state.cardDailog} onClose={this.handleDailogClose} >
                    <div className='DailogCard' style={{ backgroundColor: this.state.dailogColor }}>
                        <div className="titleIcon">
                            <div >
                                <InputBase
                                    name="title"
                                    type="text"
                                    value={this.state.dailogTitleValue}
                                    onChange={this.handleTitle}
                                    tabIndex='1'

                                />
                            </div>
                            <div >
                                <img className='IconPin' src={pin} />
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div>
                                <InputBase
                                    name="description"
                                    type="text"
                                    value={this.state.dailogDescvalue}
                                    onChange={event => this.setState({ dailogDescvalue: event.target.value })}
                                    multiline />
                            </div>
                            {this.state.dailogReminder !== null ?
                                <div >
                                    <Chip
                                        style={{ width: 'auto' }}
                                        icon={<Alarm />}
                                        label={(this.state.dailogReminder !== null ? new Date(this.state.dailogReminder).toString().slice(0, 15) : null)
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
                        </div>
                        <div className="IconsList">
                            <div className="decsIcon">
                                <NotificationImportantOutlined titleAccess="Remind me" onClick={(event) => this.addReminder(this.state.dailogNoteId, event)} />
                                <PersonAddOutlined titleAccess="Collaborate" />
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
                                <Button onClick={this.updateNotes} >
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