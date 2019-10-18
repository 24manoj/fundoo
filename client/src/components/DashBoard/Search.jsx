
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : create search componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React from 'react';
import { Card, InputBase } from '@material-ui/core';
import { ClearAll, SearchRounded } from '@material-ui/icons';
import { searchNotes } from '../../minddleware/searchNotes';
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }
    /**
     * @description search for the give charaters in notes ,responses with result
     */
    search = (event) => {
        try {
            let payload = {
                search: event.target.value
            }
            if (payload.search === "") {
                this.props.search(false, [], [], [])
            } else {
                searchNotes(payload)
                    .then(result => {
                        this.props.search(true, result.filt, result.trash, result.archive)
                    })
                    .catch(err => console.log(err)
                    )
            }
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <Card className="NavCard" onKeyPress={this.search}>
                <SearchRounded />
                <InputBase
                    placeholder="Search"
                    rowsMax="10"
                    type="string"
                    margin="dense"
                    autoComplete="true"
                    fullWidth
                    value={this.state.search}
                    onChange={(event) => this.setState({ search: event.target.value })}
                    onKeyUp={(event) => { this.search(event) }}
                />
                <div>{this.state.search !== '' ? <ClearAll style={{ marginTop: "12px" }} onClick={(event) => this.setState({ search: '' })} /> : ''}</div>
            </Card>
        )
    }
}

export default Search