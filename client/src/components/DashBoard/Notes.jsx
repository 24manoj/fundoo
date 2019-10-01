import React, { Component } from 'react';
import {
    InputBase, Card, Button, Popper, Paper, Fade, Fab, createMuiTheme, MuiThemeProvider, IconButton, ClickAwayListener
} from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ImageOutlined, NotificationImportantOutlined, PersonAddOutlined, ColorLensOutlined, ArchiveOutlined } from "@material-ui/icons";
import { updateArchive, updateColor } from '../../controller/notesController'


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
            CardIdRequired: false,
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
    }

    setNoteColor = (event) => {
        // console.log(event.currentTarget.value);


        let payload = {
            noteId: this.state.cardId,
            color: event.currentTarget.value
        }
        updateColor(payload)
            .then(updated => {
                this.setState({ cardId: '' })
                console.log('color Updated', updated);
            })
            .catch(err => {
                console.log(err);

            })
    }

    NoteArchived = () => {
        setTimeout(() => {
            let payload = {
                noteId: this.state.cardId
            }
            updateArchive(payload)
                .then(updated => {
                    let data = this.props.notes.map(ele => ele._id);
                    if (data.includes(this.state.cardId)) {
                        this.props.notes.splice(data.indexOf(this.state.cardId))
                    }
                    console.log("trash", updated);

                })
                .catch(err => {
                    console.log(err)
                })

        }, 500)


    }
    // createNote(payload)
    //     .then(note => {
    //         this.setState({ title: '', content: '' })
    //         this.setState({ NoteTake: false })
    //         this.setState({
    //             stackBar: true,
    //             stackBarMessage: "Note Archive sucessfully"
    //         })
    //         console.log(note)
    //     })
    //     .catch(err => {
    //         console.log(err);

    //     })

    // }
    setCardId = async (event) => {
        await this.setState({ cardId: event.currentTarget.id })
        console.log('after set cardId', this.state.cardId);

    }
    render() {
        console.log("in nav", this.props.notes);

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
                                onClick={this.setCardId}
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
                                    <div>
                                        <InputBase
                                            name="label"
                                            type="text"
                                            value={Element.label} />
                                    </div>

                                    <div className="IconsList">
                                        <div className="decsIcon">
                                            <NotificationImportantOutlined titleAccess="Remind me" />
                                            <PersonAddOutlined titleAccess="Collaborate" />
                                            <ColorLensOutlined titleAccess="change Color"
                                                onClick={event => this.setState({ anchorEl: event.currentTarget, poper: true })} />
                                            <ImageOutlined titleAccess=" Add Image" />
                                            <ArchiveOutlined titleAccess=" Archive Note"
                                                onClick={this.NoteArchived} />
                                        </div>

                                    </div>
                                </div>
                                <Popper open={this.state.poper} anchorEl={this.state.anchorEl}
                                    placement={'top-start'}
                                    style={{ width: '100px' }} >
                                    <ClickAwayListener onClickAway={event => this.setState({ poper: false })}>
                                        <Paper  >  {this.state.colorPalette.map((code) =>
                                            <IconButton
                                                style={{ backgroundColor: code.colorCode, width: '20px', height: '15px', margin: '2px' }}
                                                title={code.name}
                                                onClick={this.setNoteColor} value={code.colorCode} />
                                        )}</Paper>

                                    </ClickAwayListener>
                                </Popper>

                            </Card>

                        )}


                </div>
            </MuiThemeProvider>
        );
    }
}



export default Notes;