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