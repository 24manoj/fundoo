import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, MenuItem, MuiThemeProvider, createMuiTheme, IconButton } from '@material-ui/core'
import { EmojiObjectsOutlined, NotificationsOutlined, LabelOutlined, EditOutlined, ArchiveOutlined, DeleteOutline } from '@material-ui/icons'
import { withRouter, Link } from "react-router-dom";
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "71px",
                width: "20%",
                zIndex: 1000,
                overflowY: 'scroll'
            },

        }

    }
})
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideToggle: false,
            activeClass: this.props.active !== undefined ? this.props.active : 'notes'
        }

    }
    handleNotes = (event) => {
        this.setState({ activeClass: event.currentTarget.id })
        this.props.history.push('/Dashboard')
    }
    handleReminder = (event) => {
        this.setState({ activeClass: event.currentTarget.id })
        this.props.history.push({
            pathname: '/reminder',
            state: { reminder: true, title: event.currentTarget.id }
        })
    }
    handleArchive = (event) => {
        this.setState({ activeClass: event.currentTarget.id })
        this.props.history.push({
            pathname: '/archive',
            state: { archive: true, title: event.currentTarget.id }
        })

    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="NavSideBar">
                    <IconButton onClick={event => this.state.sideToggle === true ? this.setState({ sideToggle: false }) : this.setState({ sideToggle: true })}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer className="sideNav" anchor="left" open={this.state.sideToggle} variant="persistent" onClose={event => this.setState({ sideToggle: false })} >
                        <div id='notes'
                            style={{
                                backgroundColor: this.state.activeClass === 'notes' ? '#F5EEC3' : ''
                                , borderRadius: '0px 50px 50px 0px'

                            }} onClick={this.handleNotes}><MenuItem className="labelList">  <EmojiObjectsOutlined titleAccess="Notes" /><div style={{ paddingLeft: '30px' }}>Notes </div></MenuItem></div>
                        <div id='reminder'
                            style={{
                                backgroundColor: this.state.activeClass === 'reminder' ? '#F5EEC3' : ''
                                , borderRadius: '0px 50px 50px 0px'
                            }} onClick={this.handleReminder}> <MenuItem className="labelList"> <NotificationsOutlined titleAccess="Reminder" /> <div style={{ paddingLeft: "30px" }}>Reminders </div></MenuItem></div>
                        <hr style={{ width: "100%" }} />
                        <MenuItem className="labelList">Label</MenuItem>
                        <div className="labels">

                            {this.props.labels.map((element) =>

                                <div style={{
                                    backgroundColor: this.state.activeClass === element.labelName ? '#F5EEC3' : ''
                                    , borderRadius: '0px 50px 50px 0px'
                                }} onClick={event => this.setState({ activeClass: element.labelName })} key={element._id}> <MenuItem className="labelList"> <LabelOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px" }}> {element.labelName} </div></MenuItem></div>
                            )}
                        </div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'editLabel' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'editLabel' })}><MenuItem className="labelList"> <EditOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Edit Labels </div></MenuItem></div>

                        <hr style={{ width: "100%" }} />
                        <div>
                            <div id='archive'
                                style={{
                                    backgroundColor: this.state.activeClass === 'archive' ? '#F5EEC3' : ''
                                    , borderRadius: '0px 50px 50px 0px'
                                }} onClick={this.handleArchive}><MenuItem className="labelList"> <ArchiveOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Archive </div></MenuItem></div>
                            <div style={{
                                backgroundColor: this.state.activeClass === 'trash' ? '#F5EEC3' : ''
                                , borderRadius: '0px 50px 50px 0px'
                            }} onClick={event => this.setState({ activeClass: 'trash' })}><MenuItem className="labelList"> <DeleteOutline titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Trash</div></MenuItem></div>

                        </div>
                        <hr style={{ width: "100%" }} />

                    </Drawer>
                </div>
            </MuiThemeProvider>

        )
    }
}
export default withRouter(SideNav);