import React, { Component } from 'react';
import {
    InputBase, Card, Button, Popper, Paper, Fade, Fab, createMuiTheme, MuiThemeProvider, IconButton, ClickAwayListener, Chip
} from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ImageOutlined, Alarm, NotificationImportantOutlined, PersonAddOutlined, ColorLensOutlined, ArchiveOutlined } from "@material-ui/icons";



const theme = createMuiTheme({
    overrides: {
        MuiFab: {
            root: {
                width: '25px',
                height: '25px'
            }
        }
    }
})

class Notes extends Component {
    constructor(props) {
        super(props)
        // console.log('Allnotes', this.props)
        this.state = {
            cards: [],
            poper: false,
            anchorEl: '',
            icons: true,
            cardId: '',
            CardIdRequired: false

        }
    }

    setNoteColor = async (event, cardId) => {
        await this.setState({ poper: true, anchorEl: event.currentTarget })

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
            this.props.NoteReminder(true, AnchorEl, cardId)
        } catch (err) {
            console.log(err);

        }

    }
    render() {
        let cardCss = this.props.view ? 'ListView' : 'notesCard'
        return (
            <MuiThemeProvider theme={theme}>
                <div className="notesContainer">
                    {this.props.notes.length <= 0 ?
                        <div className="searchNote">
                            No Note Found!!!!
                        </div> :
                        this.props.notes.map((Element) =>
                            <Card className={cardCss} key={Element._id} id={Element._id}

                                style={{ backgroundColor: Element.color }}>
                                <div className="titleIcon">
                                    <div>
                                        <InputBase
                                            name="title"
                                            type="text"
                                            value={Element.title} />
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
                                            value={Element.content} />
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
                                    <div className="IconsList">
                                        <div className="decsIcon">
                                            <NotificationImportantOutlined titleAccess="Remind me" onClick={(event) => this.addReminder(Element._id, event)} />
                                            <PersonAddOutlined titleAccess="Collaborate" />
                                            <ColorLensOutlined titleAccess="change Color"
                                                onClick={(event) => this.setNoteColor(event, Element._id)} />
                                            <ImageOutlined titleAccess=" Add Image" />
                                            <ArchiveOutlined titleAccess=" Archive Note"
                                                onClick={() => this.NoteArchived(Element._id)} />
                                        </div>

                                    </div>
                                </div>
                            </Card>

                        )}

                </div>
            </MuiThemeProvider>
        );
    }
}





export default Notes;