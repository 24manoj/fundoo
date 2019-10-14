import React from 'react'
import { Dialog, TextField, MenuItem } from '@material-ui/core'
import { getLabels, createLabel, updateLabel, deleteLabel } from '../../controller/notesController'
import {  LabelOutlined, EditOutlined, DoneOutline, Add, DeleteOutline } from '@material-ui/icons'
import { messageService } from '../../minddleware/middleWareServices'
class DailogLabel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DailogOpen: false,
            Labels: [],
            createLabel: false,
            labelState: false,
            labelValue: '',
            editlabel: false,
            activeLabel: '',
            activeEditLabel: '',
            createLabelValue: '',
            hidden: false
        }
    }
    componentDidMount() {
        getLabels()
            .then(labels => {
                this.setState({ Labels: labels.data.data })
            })
            .catch(err => console.log(err)
            )
    }
    stateOpen = async () => {
        await this.setState({ DailogOpen: this.props.Dailog !== undefined ? this.props.Dailog : false })
        return this.state.DailogOpen
    }
    stateClose = async () => {
        await this.setState({ DailogOpen: !this.props.Dailog })
        this.props.DailogClose(this.state.DailogOpen)
    }
    handleMouseOver = async (e, element) => {
        e.preventDefault();
        console.log("element on mouse over", element._id);

        await this.setState({ labelState: !this.state.labelState, activeLabel: element._id })

    }
    handleEditLabel = (element) => {
        this.setState({ editlabel: !this.state.editlabel, activeEditLabel: element._id, labelValue: element.labelName, activeLabel: '' })

    }
    handleCreateLabel = (event) => {
        let payload = {
            labelName: this.state.createLabelValue
        }
        createLabel(payload).then(createdata => {
            let array = this.state.Labels;
            array.unshift(createdata.data.data)
            this.setState({ labels: array, createLabelValue: '' })
            messageService.sendMessage({ key: 'labelCreated', value: array })

        })
            .catch(err => {
                console.log(err);

            })
    }

    updateLabel = (element) => {
        try {

            let payload = {
                id: element._id,
                labelName: this.state.labelValue
            }
            updateLabel(payload)
                .then(updated => {
                    let array = this.state.Labels;
                    let index = array.map(ele => ele._id).indexOf(element._id)
                    array[index].labelName = this.state.labelValue
                    this.setState({ labels: array, editlabel: false, activeEditLabel: '' })
                    messageService.sendMessage({ key: 'labelEdited', value: array })

                })
        } catch (err) {
            console.log(err);

        }
    }

    handelDelete = (e, element) => {
        e.preventDefault();
        try {
            let payload = {
                id: element._id,
            }

            deleteLabel(payload)
                .then(deleted => {
                    let array = this.state.Labels;
                    let index = array.map(ele => ele._id).indexOf(element._id)
                    array.splice(index, 1)
                    this.setState({ labels: array, editlabel: false, activeEditLabel: '' })
                    messageService.sendMessage({ key: 'labelDeleted', value: array })
                })
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const { hidden } = this.state;
        return (
            <div>
                <Dialog open={this.stateOpen} onClose={this.stateClose} >
                    <div className='EditLabel'>
                        <h3> Edit Labels</h3>
                        {!this.state.createLabel ?
                            <div className="createLabel" onClick={event => this.setState({ createLabel: !this.state.createLabel })}>
                                <Add /> CreateLabel</div>
                            :
                            <div>
                                <TextField
                                    type="text"
                                    placeholder="Create Label"
                                    value={this.state.createLabelValue}
                                    onChange={event => this.setState({ createLabelValue: event.target.value })}
                                />
                                <DoneOutline onClick={this.handleCreateLabel} />
                            </div>
                        }

                        <div className="editLabel-options">
                            {this.state.Labels.map(element =>

                                <div className="labelContent" key={element._id}>
                                    <div hidden={element._id === this.state.activeLabel ? true : false} onMouseEnter={(e) => this.handleMouseOver(e, element)}
                                    ><LabelOutlined /></div>
                                    <div hidden={element._id === this.state.activeLabel ? false : true} onMouseLeave={event => this.setState({ labelState: !this.state.labelState, activeLabel: '' })} >
                                        <DeleteOutline onClick={e => this.handelDelete(e, element)} /></div>

                                    <label hidden={element._id === this.state.activeEditLabel ? true : false}> {element.labelName}</label>
                                    <div hidden={element._id === this.state.activeEditLabel ? false : true}>
                                        <TextField
                                            type='text'
                                            placeholder="EditLabel"
                                            value={this.state.labelValue}
                                            onChange={event => this.setState({ labelValue: event.target.value })}
                                        />
                                    </div>
                                    <div hidden={element._id === this.state.activeEditLabel ? true : false}> <EditOutlined onClick={() => this.handleEditLabel(element)} /></div>
                                    <div hidden={element._id === this.state.activeEditLabel ? false : true} > <DoneOutline onClick={() => this.updateLabel(element)} /></div>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }

}

export default DailogLabel