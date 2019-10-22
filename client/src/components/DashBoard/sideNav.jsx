/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a sidenav componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, MenuItem, MuiThemeProvider, createMuiTheme, IconButton } from '@material-ui/core'
import { EmojiObjectsOutlined, NotificationsOutlined, LabelOutlined, EditOutlined, ArchiveOutlined, DeleteOutline } from '@material-ui/icons'
import { withRouter } from "react-router-dom";
import DailogLabel from './DailogLabel'
import { messageService } from '../../minddleware/middleWareServices';
/**
 * @description overiding theme
 */
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "65px",
                zIndex: 1000,
                overflowY: 'scroll',
                overflowX: 'hidden !important',
                height: '90%'

            },

        },
        MuiIconButton: {
            root: {
                padding: '0px'

            }
        }
    }
})
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideToggle: false,
            activeClass: this.props.active !== undefined ? this.props.active : 'notes',
            editLabeldailog: false
        }
    }
    /**
     * @description handels notes component
     */
    handleNotes = (event) => {
        try {
            this.setState({ activeClass: event.currentTarget.id })
            this.props.history.push('/Dashboard')
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels reminder component
    */
    handleReminder = (event) => {
        try {
            this.setState({ activeClass: event.currentTarget.id })
            this.props.history.push({
                pathname: '/reminder',
                state: { reminder: true, title: event.currentTarget.id }
            })
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels Archive component
    */
    handleArchive = (event) => {
        try {
            this.setState({ activeClass: event.currentTarget.id })
            this.props.history.push({
                pathname: '/archive',
                state: { archive: true, title: event.currentTarget.id }
            })
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels trash component
    */
    handleTrash = (event) => {
        try {
            this.setState({ activeClass: event.currentTarget.id })
            this.props.history.push({
                pathname: '/trash',
                state: { Trash: true, title: event.currentTarget.id }
            })
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels labels component
    */
    handleLabels = (event) => {
        try {
            this.setState({ activeClass: event.currentTarget.id })
            this.props.history.push({
                pathname: '/labels',
                state: { labels: true, title: event.currentTarget.id }
            })
        } catch (err) {
            console.log(err);
        }
    }
    /**
    * @description handels editlabels component
    */
    handleEditLabels = () => {
        try {
            this.setState({ editLabeldailog: !this.state.editLabelPoper })

        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels Dailog
    */
    DailogClose = (toogle) => {
        this.setState({ editLabeldailog: toogle })
    }
    /**
    * @description handels sidenav toggle
    */
    toogle = async () => {
        try {
            await this.setState({
                sideToggle: !this.state.sideToggle
            })
            messageService.sendMessage({ key: 'sideNav', value: this.state.sideToggle })
        } catch (err) {
            console.log(err);

        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="NavSideBar">
                    <IconButton onClick={this.toogle}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={this.state.sideToggle} variant="persistent" onClose={event => this.setState({ sideToggle: false })} >
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

                                <div id={element.labelName} style={{
                                    backgroundColor: this.state.activeClass === element.labelName ? '#F5EEC3' : ''
                                    , borderRadius: '0px 50px 50px 0px'
                                }} onClick={this.handleLabels} key={element._id}> <MenuItem className="labelList"> <LabelOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px" }}> {element.labelName} </div></MenuItem></div>
                            )}
                        </div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'editLabel' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={this.handleEditLabels}><MenuItem className="labelList"> <EditOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Edit Labels </div></MenuItem></div>

                        <hr style={{ width: "100%" }} />

                        <div id='archive'
                            style={{
                                backgroundColor: this.state.activeClass === 'archive' ? '#F5EEC3' : ''
                                , borderRadius: '0px 50px 50px 0px'
                            }} onClick={this.handleArchive}><MenuItem className="labelList"> <ArchiveOutlined titleAccess="Edit Label" />
                                <div style={{ paddingLeft: "30px" }}> Archive </div></MenuItem></div>
                        <div id='trash'
                            style={{
                                backgroundColor: this.state.activeClass === 'trash' ? '#F5EEC3' : ''
                                , borderRadius: '0px 50px 50px 0px'
                            }} onClick={this.handleTrash}>
                            <MenuItem className="labelList"> <DeleteOutline titleAccess="Edit Label" />
                                <div style={{ paddingLeft: "30px" }}> Trash</div></MenuItem></div>

                        <hr style={{ width: "100%" }} />
                    </Drawer>
                    {this.state.editLabeldailog ?
                        <DailogLabel Dailog={this.state.editLabeldailog} DailogClose={this.DailogClose} /> : ''}
                </div>
            </MuiThemeProvider>

        )
    }
}
export default withRouter(SideNav);