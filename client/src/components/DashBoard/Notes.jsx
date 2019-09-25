import React, { Component } from 'react';
import { InputBase, Card, Button, Popper, Paper, Fade, Fab, createMuiTheme, MuiThemeProvider, IconButton, ClickAwayListener } from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ImageOutlined, NotificationImportantOutlined, PersonAddOutlined, ColorLensOutlined, ArchiveOutlined } from "@material-ui/icons";
import { getNotes } from '../../controller/notesController'
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
    constructor() {
        super()
        getNotes()
            .then(notes => {
                // this.setState({ cards: notes.data })
            })
            .catch(err => console.log(err))
        this.state = {
            cards: [],
            poper: false,
            anchorEl: '',
            icons: true,
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
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="notesContainer">
                    {this.state.cards.map((Element) =>
                        <Card className="notesCard"   >
                            <div className="titleIcon">
                                <div>  <InputBase
                                    name="title"
                                    type="text"
                                    value={Element.title} />
                                </div>
                                <img src={pin} />
                            </div>
                            <div >
                                <InputBase
                                    name="description"
                                    type="text"
                                    value={Element.title} />
                                <InputBase
                                    name="label"
                                    type="text"
                                    value={Element.title} />
                                <InputBase
                                    name="reminder"
                                    type="text"
                                    value={Element.title} />
                                <div className="decsIcon">
                                    <NotificationImportantOutlined titleAccess="Remind me" />
                                    <PersonAddOutlined titleAccess="Collaborate" />
                                    <ColorLensOutlined titleAccess="change Color" onClick={event => this.setState({ anchorEl: event.currentTarget, poper: true })} />
                                    <ImageOutlined titleAccess=" Add Image" />
                                    <ArchiveOutlined titleAccess=" Archive Note" />
                                    <Button variant='text' onClick={event => this.setState({ NoteTake: false })}><b>Close</b></Button>
                                </div>
                            </div>
                        </Card>

                    )}

                    <Popper open={this.state.poper} anchorEl={this.state.anchorEl} placement={'top-start'} >
                        <ClickAwayListener onClickAway={event => this.setState({ poper: false })}>
                            <Paper className="NotesCollorSellection">  {this.state.colorPalette.map((code) => <div> <IconButton style={{ backgroundColor: code.colorCode }} title={code.name} />
                            </div>
                            )}</Paper>
                        </ClickAwayListener></Popper>


                </div>
            </MuiThemeProvider >
        );
    }
}



export default Notes;