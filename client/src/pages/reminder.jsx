import React, { Component } from 'react';
import DashBoard from '../pages/DashBoard'

class reminder extends Component {

    render() {
        return (
            <div>
                <DashBoard reminder={this.props.location.state} />
            </div>
        )
    }
}
export default reminder;
