import React, { Component } from 'react';
import { Dialog, Avatar, Button, TextField, Chip } from '@material-ui/core';
import { PersonAddOutlined, PersonAdd, Done, } from '@material-ui/icons';
import { checkMail } from "../../controller/notesController";
import { addCollaborate } from '../../controller/notesController'
import { messageService } from '../../minddleware/middleWareServices';
export class Collaborator extends Component {
    session = JSON.parse(sessionStorage.getItem('UserSession'))

    constructor(props) {

        super(props);
        this.state = {
            dailog: false,
            doneState: false,
            email: '',
            emailErr: false,
            collaborateEmail: []
        };
    }

    handleClick = async (e) => {
        e.preventDefault()
        await this.setState({ dailog: !this.state.dailog })
        if (this.props.notes === undefined)
            this.props.CollaboratorDailog(this.state.dailog)
    }

    handleClose = async () => {
        await this.setState({ dailog: false })
        if (this.props.notes === undefined)

            this.props.CollaboratorDailog(this.state.dailog)
    }
    checkMail = () => {
        try {
            if (this.props.notes === undefined)
                this.props.CollaborateState(true)
            let exist = false;
            let EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!EmailRegex.test(this.state.email)) {
                this.setState({ emailErr: true })
            }
            else {
                for (const ele of this.state.collaborateEmail) {
                    if (ele.email === this.state.email) {
                        exist = true;
                    }
                }
                if (!exist) {
                    let payload = {
                        email: this.state.email
                    }
                    checkMail(payload)
                        .then(data => {
                            let array = this.state.collaborateEmail
                            array.push(data.data.data)
                            this.setState({
                                collaborateEmail: array,
                                email: ''
                            })
                        }
                        )
                        .catch(err => console.log(err)
                        )
                }
            }

        } catch (err) {
            console.log(err);

        }
    }
    handleDeleteColl = (event) => {
        try {

            let array = this.state.collaborateEmail
            let index = array.map(ele => ele._id).indexOf(event.target.id)
            let array2 = this.state.collaborateEmail
            array2.splice(index, 1)
            this.setState({
                collaborateEmail: array2
            })
            if (this.props.notes === undefined)
                this.props.CollaborateState(true)

        } catch (err) {
            console.log(err);

        }
    }

    addCollaborated = () => {
        try {
            let payload = {
                noteId: this.props.cardId,
                collId: this.state.collaborateEmail
            }
            addCollaborate(payload)
                .then(data => {

                    messageService.sendMessage({ key: 'updateCollaborated', value: { colldetail: this.state.collaborateEmail, cardId: this.props.cardId } })
                })
                .catch(err => {
                    console.log(err);

                })

        } catch (err) {
            console.log(err);

        }
    }
    saveCollaborate = async () => {
        try {
            this.props.cardId !== undefined ?
                this.addCollaborated()
                :
                this.props.CollaboratorAdd(this.state.collaborateEmail, undefined)
            if (this.props.notes === undefined) {
                this.props.CollaborateState(true)
            }
            this.setState({ dailog: false, email: '', emailErr: false })


        } catch (err) {
            console.log(err);

        }
    }
    handleCloseColl = () => {
        if (this.props.notes === undefined)
            this.props.CollaborateState(true)
        this.setState({ collaborateEmail: [], email: '', emailErr: '', dailog: false })

    }
    render() {

        return (
            <div >
                <PersonAddOutlined titleAccess="Collaborate" onClick={this.handleClick} />
                <Dialog open={this.state.dailog}
                    onClose={this.handleClose}>
                    <div className="Collaborate-div">
                        <label> Collaborators</label>
                        <hr style={{ width: '100%' }} />
                        <div className="collaborate-div1">
                            <Avatar src={this.session.data.url} />
                            <div className="collaborate-div2">
                                <span className="collaborate-div2-span1">{this.session.data.firstName} {this.session.data.lastName}  (Owner)</span>
                                <span className="collaborate-div2-span2">{this.session.data.email}</span>
                            </div>
                        </div>
                        <div>
                            {this.state.collaborateEmail !== undefined ?
                                this.state.collaborateEmail.map(ele =>
                                    <Chip id={ele._id}
                                        style={{
                                            width: "auto"
                                        }}
                                        avatar={<Avatar alt="profile" src={ele.url} />}
                                        label={
                                            ele.email
                                        }
                                        onDelete={this.handleDeleteColl
                                        }


                                    />
                                ) : ''}
                        </div>
                        <div className="collaborate-div1">
                            <PersonAdd className="collaborate-div2-icon" />
                            <TextField placeholder="person or email to share with"
                                type="email"
                                InputProps={{ disableUnderline: true }}
                                value={this.state.email}
                                onKeyPress={event => this.setState({ doneState: true })}
                                onChange={event => this.setState({ email: event.currentTarget.value })}
                                helperText={this.state.emailErr ? <span style={{ color: 'red' }}> Email invalid</span> : ''}
                                onClick={event => this.props.notes === undefined ? this.props.CollaborateState(true) : ''
                                }
                                fullWidth
                            />
                            {this.state.doneState ? <Done onClick={this.checkMail} /> : ''}
                        </div>

                        <div className="collaborate-div-footer">
                            <Button className="collaborate-button" type="reset" onClick={this.handleCloseColl}>
                                Cancel
                            </Button>
                            <Button className="collaborate-button" type="submit" onClick={this.saveCollaborate}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default Collaborator;
