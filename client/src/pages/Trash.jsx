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

        messageService.getMessage().subscribe( async message => {
            if (message.text.key === 'MoreTrashOPtions') {
                await this.setState({ cardId: message.text.cardId })

                let payload =  { 
                    noteId: this.state.cardId,
                }
                console.log("cardId", payload);


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
                await  this.setState({ cardId: message.text.cardId })
                let payload = {
                    noteId: this.state.cardId,
                }
            
                
                restoreNotes(payload)
                    .then( restored => {
                        let array = this.state.TrashArray
                        let index = array.map(ele => ele._id).indexOf(this.state.cardId)
                        array.splice(index, 1)
                     this.setState({ TrashArray: array, cardId: '' })
                    })
                    .catch(err => console.log(err)
                    )
            }
        })
    }
    componentDidMount() {
        getTrashNotes()
            .then(TrashNotes => {
                this.setState(({
                    TrashArray: TrashNotes.data.data
                }))
            })
            .catch(err => {
                console.log(err);
            }
            )

    }
    render() {

        return (
            <div>
                <DashBoard TrashState={this.props.location.state} TrashNotes={this.state.TrashArray} />

            </div>
        )
    }
}
export default Trash;
