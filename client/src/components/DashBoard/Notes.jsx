import React, { Component } from 'react';
import { InputBase, Card, Button } from '@material-ui/core';
import pin from '../../assets/afterPin.svg'
import { ListAltOutlined, List, CheckBoxOutline, BrushOutlined, ImageAspectRatioOutlined, CheckBoxOutlined, ImageOutlined, PinDropOutlined, PersonPin, LabelImportantOutlined, ImportantDevicesOutlined, NotificationImportant, NotificationImportantOutlined, PersonAddOutlined, ColorizeOutlined, ColorLensOutlined, ArchiveOutlined, CloseOutlined } from "@material-ui/icons";


class Notes extends Component {
    constructor() {
        super()
        this.state = {
            cards: ['hiii', 'bye', 'hello', 'good', 'ok', 'welcome', 'gdhfffhfhfhfhbhf']
        }
    }
    render() {
        return (
            <div className="notesContainer">
                {this.state.cards.map((Element) =>
                    <Card className="notesCard" >
                        <div className="titleIcon">
                            <div>  <InputBase
                                name="title"
                                type="text"
                                value={Element} />
                            </div>
                            <img src={pin} />
                        </div>
                        <div >
                            <InputBase
                                name="title"
                                type="text"
                                value={Element} />
                            <div className="decsIcon">
                                <NotificationImportantOutlined titleAccess="Remind me" />
                                <PersonAddOutlined titleAccess="Collaborate" />
                                <ColorLensOutlined titleAccess="change Color" />
                                <ImageOutlined titleAccess=" Add Image" />
                                <ArchiveOutlined titleAccess=" Archive Note" />
                                <Button variant='text' onClick={event => this.setState({ NoteTake: false })}><b>Close</b></Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        );
    }
}



export default Notes;