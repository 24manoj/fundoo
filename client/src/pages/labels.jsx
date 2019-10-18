
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a labels component
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'
class Labels extends Component {
    render() {
        return (
            <div>
                <DashBoard LabelsState={this.props.location.state} />
            </div>
        )
    }
}
export default Labels;