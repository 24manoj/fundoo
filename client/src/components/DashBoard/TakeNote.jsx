import React, { Component } from "react";
import { TextField, Card, MuiThemeProvider, InputBase, IconButton, Icon, ClickAwayListener, Button, Popper, Paper, Snackbar } from "@material-ui/core";
import '../../App.css'
import { ListAltOutlined, List, CheckBoxOutline, BrushOutlined, ImageAspectRatioOutlined, CheckBoxOutlined, UndoOutlined, ImageOutlined, PinDropOutlined, PersonPin, LabelImportantOutlined, ImportantDevicesOutlined, NotificationImportant, NotificationImportantOutlined, PersonAddOutlined, ColorizeOutlined, ColorLensOutlined, ArchiveOutlined, CloseOutlined } from "@material-ui/icons";
import pin from '../../assets/afterPin.svg'
import { createNote } from '../../controller/notesController'
class Notes extends Component {
    constructor() {
        super()
        this.state = {
            NoteTake: false,
            NoteTitile: '',
            NoteContent: '',
            NoteColor: '',
            anchorEl: null,
            ColorProper: false,
            Archive: false,
            stackBar: false,
            stackBarMessage: '',
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

    CreateNote = () => {
        let payload = {
            title: this.state.NoteTitile,
            content: this.state.NoteContent,
            color: this.state.NoteColor,
            Archive: this.state.Archive
        }
        // console.log(payload);

        createNote(payload)
            .then(note => {
                this.setState({ NoteTake: false })
                console.log(note)
            })
            .catch(err => {
                console.log(err);

            })


    }
    NoteArchived = (event) => {
        let payload = {
            title: this.state.NoteTitile,
            content: this.state.NoteContent,
            color: this.state.NoteColor,
            Archive: true
        }
        createNote(payload)
            .then(note => {
                this.setState({ title: '', content: '' })
                this.setState({ NoteTake: false })
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Note Archive sucessfully"
                })
                console.log(note)
            })
            .catch(err => {
                console.log(err);

            })

    }
    render() {
        return (
            <div>

                <div className="NoteCreate">

                    {!this.state.NoteTake ?
                        <Card className="TakeNote" hidden={this.state.NoteTake}>

                            <div><InputBase
                                onClick={event => this.setState({ NoteTake: true })}
                                title='Title'
                                type="text"
                                placeholder="Take a note..."
                            />
                            </div>
                            <div >
                                <CheckBoxOutlined titleAccess="New List" />
                                <BrushOutlined titleAccess=" new Note with Drawing" />
                                <ImageOutlined titleAccess="new Note with image" />

                            </div>

                        </Card>
                        : <ClickAwayListener onClickAway={event => this.state.ColorProper ? '' : this.setState({ NoteTake: false })}  >
                            <Card className="TakeDetails" hidden={!this.state.NoteTake} style={{ backgroundColor: this.state.NoteColor }}>
                                <div className="titleIcon"> <div><InputBase
                                    title='Title'
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.NoteTitile}
                                    onChange={event => this.setState({ NoteTitile: event.target.value })}
                                    fullWidth
                                />
                                </div>
                                    <div>
                                        <img src={pin} className="Iconpin" />
                                    </div>
                                </div>
                                <div >
                                    <InputBase
                                        title='Description'
                                        type="text"
                                        placeholder="Take a note..."
                                        value={this.state.NoteContent}
                                        onChange={event => this.setState({ NoteContent: event.target.value })}
                                        fullWidth
                                    />
                                </div>
                                <div className="TakeNoteIcon">
                                    <div className="TakeNoteIcon-Icons">
                                        <NotificationImportantOutlined titleAccess="Remind me" />
                                        <PersonAddOutlined titleAccess="Collaborate" />
                                        <ColorLensOutlined titleAccess="change Color" onClick={event => this.setState({ anchorEl: event.currentTarget, ColorProper: true })} />
                                        <ImageOutlined titleAccess=" Add Image" />
                                        <ArchiveOutlined titleAccess=" Archive Note" onClick={this.NoteArchived} />
                                    </div>
                                    <Button variant='text' onClick={this.CreateNote}><b>Close</b></Button>
                                </div>

                                <Popper open={this.state.ColorProper}
                                    anchorEl={this.state.anchorEl} placement={'top-start'} style={{ width: '100px' }}  >
                                    <ClickAwayListener
                                        onClickAway={event => this.state.NoteTake ? this.setState({ ColorProper: false, anaxhorEl: '' }) : ''}  >

                                        <Paper >  {this.state.colorPalette.map((code) =>
                                            <IconButton
                                                style={{ backgroundColor: code.colorCode, margin: '2px' }}
                                                title={code.name}
                                                onClick={event => this.setState({ NoteColor: event.target.value })}
                                                value={code.colorCode} />

                                        )}</Paper>

                                    </ClickAwayListener>

                                </Popper>

                            </Card>
                        </ClickAwayListener>
                    }

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.stackBar}
                    autoHideDuration={6000}
                    message={this.state.stackBarMessage}
                    // onClose={this.snackbarClose}
                    action={
                        <UndoOutlined onClick={event => this.setState({ stackBar: false })} />
                    }
                />
            </div>
        )
    }
}
export default Notes;