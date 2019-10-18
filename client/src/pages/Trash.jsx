
/********************************************************************************************************************
 * @Execution : default : cmd> npm start 
 * @Purpose : fundoonotes reactjs
 * @description : Build a Trash component
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/

/** @description importing libraries */
import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'
import { getTrashNotes, deleteNotes, restoreNotes } from "../controller/notesController";
import { messageService } from '../minddleware/middleWareServices';

class Trash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TrashArray: [],
            OptionsPoper: false,
            anchorEl: null,
            cardId: ''
        }
        /** @description rxjs Observer for  data exchange between componenets */
        messageService.getMessage().subscribe(async message => {
            try {
                if (message.text.key === 'MoreTrashOPtions') {
                    await this.setState({ cardId: message.text.cardId })
                    let payload = {
                        noteId: this.state.cardId,
                    }
                    deleteNotes(payload)
                        .then(async deltedNote => {
                            let array = this.state.TrashArray
                            let index = array.map(ele => ele._id).indexOf(this.state.cardId)
                            array.splice(index, 1)
                            this.setState({ TrashArray: array, cardId: '' })
                        })
                        .catch(err => console.log(err)
                        )
                }
                if (message.text.key === 'MoreOptionsRestore') {
                    await this.setState({ cardId: message.text.cardId })
                    let payload = {
                        noteId: this.state.cardId,
                    }
                    restoreNotes(payload)
                        .then(restored => {
                            let array = this.state.TrashArray
                            let index = array.map(ele => ele._id).indexOf(this.state.cardId)
                            array.splice(index, 1)
                            this.setState({ TrashArray: array, cardId: '' })
                        })
                        .catch(err => console.log(err)
                        )
                }
            } catch (err) {
                console.log(err);

            }
        })
    }
    /** @description invokes after render method  */
    componentDidMount() {
        getTrashNotes()
            .then(TrashNotes => {
                let AllNotes = TrashNotes.data.data
                AllNotes.sort((a, b) => {
                    return ((a.index < b.index) ? -1 : ((a.index > b.index) ? 1 : 0));
                })
                this.setState({
                    TrashArray: AllNotes
                })
            })
            .catch(err => {
                console.log(err);
            }
            )
    }
    /** @description renders component to dom */
    render() {
        return (
            <div>

                <DashBoard TrashState={this.props.location.state} TrashNotes={this.state.TrashArray} />

            </div>
        )
    }
}
export default Trash;
