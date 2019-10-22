/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : create editlabel componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React from 'react'
import { Dialog, TextField, MenuItem, IconButton } from '@material-ui/core'
import { getLabels, createLabel, updateLabel, deleteLabel } from '../../controller/notesController'
import { LabelOutlined, EditOutlined, DoneOutline, Add, DeleteOutline, AddCircleOutline, DoneAll, Done } from '@material-ui/icons'
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
    /**
     * @description getsLabels sets to state variable
     */
    componentDidMount() {
        getLabels()
            .then(labels => {
                this.setState({ Labels: labels.data.data })
            })
            .catch(err => console.log(err)
            )
    }
    /**
     * @description handles dailog open
     */
    stateOpen = async () => {
        try {
            await this.setState({ DailogOpen: this.props.Dailog !== undefined ? this.props.Dailog : false })
            return this.state.DailogOpen
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description handles dailog close
     */
    stateClose = async () => {
        try {
            await this.setState({ DailogOpen: !this.props.Dailog })
            this.props.DailogClose(this.state.DailogOpen)
        } catch (err) {
            console.log(err);

        }
    }
    /**
     * @description habdles mouse over
     */
    handleMouseOver = async (e, element) => {
        try {
            e.preventDefault();
            await this.setState({ labelState: !this.state.labelState, activeLabel: element._id })
        } catch (err) {
            console.log(err);

        }
    }/**
     * @description  handles labels edit
     */
    handleEditLabel = (element) => {
        this.setState({ editlabel: !this.state.editlabel, activeEditLabel: element._id, labelValue: element.labelName, activeLabel: '' })

    }
    /**
     * @description handles new label create
     */
    handleCreateLabel = (event) => {
        try {
            let payload = {
                labelName: this.state.createLabelValue
            }
            if (this.state.createLabelValue === '') {
                this.setState({ createLabelValue: '', createLabel: !this.state.createLabel })

            } else {
                createLabel(payload).then(createdata => {
                    let array = this.state.Labels;
                    array.unshift(createdata.data.data)
                    this.setState({ labels: array, createLabelValue: '', createLabel: !this.state.createLabel })
                    messageService.sendMessage({ key: 'labelCreated', value: array })

                })
                    .catch(err => {
                        console.log(err);

                    })
            }
        } catch (err) {
            console.log(err);

        }
    }
    /**
         * @description handle update label
         */
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
    /**
         * @description handles delete labels
         */
    handelDelete = (e, element) => {
        try {
            e.preventDefault();
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
                                <AddCircleOutline /> <span style={{ marginLeft: '4px' }}>CreateLabel</span></div>
                            :
                            <div className="createlabel-text">
                                <TextField
                                    style={{
                                        width: '75%'
                                    }}
                                    type="text"
                                    placeholder="Create Label"
                                    value={this.state.createLabelValue}
                                    onChange={event => this.setState({ createLabelValue: event.target.value })}
                                />
                                <IconButton><Done onClick={this.handleCreateLabel} /></IconButton>
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
                                            style={{ marginLeft: '10px' }}
                                            type='text'
                                            placeholder="EditLabel"
                                            value={this.state.labelValue}
                                            onChange={event => this.setState({ labelValue: event.target.value })}
                                        />
                                    </div>
                                    <div hidden={element._id === this.state.activeEditLabel ? true : false}> <IconButton><EditOutlined onClick={() => this.handleEditLabel(element)} /></IconButton></div>
                                    <div hidden={element._id === this.state.activeEditLabel ? false : true} ><IconButton> <Done onClick={() => this.updateLabel(element)} /></IconButton></div>
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