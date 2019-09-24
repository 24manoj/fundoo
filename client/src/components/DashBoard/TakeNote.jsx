import React, { Component } from "react";
import { TextField, Card, MuiThemeProvider, InputBase, IconButton, Icon, ClickAwayListener, Button } from "@material-ui/core";
import '../../App.css'
import { ListAltOutlined, List, CheckBoxOutline, BrushOutlined, ImageAspectRatioOutlined, CheckBoxOutlined, ImageOutlined, PinDropOutlined, PersonPin, LabelImportantOutlined, ImportantDevicesOutlined, NotificationImportant, NotificationImportantOutlined, PersonAddOutlined, ColorizeOutlined, ColorLensOutlined, ArchiveOutlined, CloseOutlined } from "@material-ui/icons";
import pin from '../../assets/afterPin.svg'

class Notes extends Component {
    constructor() {
        super()
        this.state = {
            NoteTake: false,
        }
    }
    render() {
        return (
            <div>
                <div className="NoteCreate">
                    <ClickAwayListener onClickAway={event => this.setState({ NoteTake: false })} >
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
                            :
                            <Card className="TakeDetails" hidden={!this.state.NoteTake}>
                                <div className="titleIcon"> <div><InputBase
                                    title='Title'
                                    type="text"
                                    placeholder="Title"
                                    fullWidth
                                />
                                </div>
                                    <div>
                                        <img src={pin} />
                                    </div>
                                </div>
                                <div >
                                    <InputBase
                                        title='Description'
                                        type="text"
                                        placeholder="Take a note..."
                                        fullWidth
                                    />
                                </div>
                                <div className="decsIcon">
                                    <NotificationImportantOutlined titleAccess="Remind me" />
                                    <PersonAddOutlined titleAccess="Collaborate" />
                                    <ColorLensOutlined titleAccess="change Color" />
                                    <ImageOutlined titleAccess=" Add Image" />
                                    <ArchiveOutlined titleAccess=" Archive Note" />

                                    <Button variant='text' onClick={event => this.setState({ NoteTake: false })}><b>Close</b></Button>
                                </div>


                            </Card>
                        }
                    </ClickAwayListener>
                </div>
            </div>

        )
    }
}
export default Notes;