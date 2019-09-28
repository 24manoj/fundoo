import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, MenuItem, MuiThemeProvider, createMuiTheme, IconButton } from '@material-ui/core'
import { EmojiObjectsOutlined, NotificationsOutlined, LabelOutlined, EditOutlined, ArchiveOutlined, DeleteOutline } from '@material-ui/icons'
import { bgcolor } from '@material-ui/system';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "66px",
                width: "20%",
                zIndex: 1000,
                float: "scrollY"
            }
        }
    }
})
class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideToggle: false,
            activeClass: 'notes'

        }

    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <IconButton onClick={event => this.state.sideToggle === true ? this.setState({ sideToggle: false }) : this.setState({ sideToggle: true })}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer className="sideNav" anchor="left" open={this.state.sideToggle} variant="persistent" onClose={event => this.setState({ sideToggle: false })} >
                        <div style={{
                            backgroundColor: this.state.activeClass === 'notes' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'notes' })}> <MenuItem  > <EmojiObjectsOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px", minWidth: '24* 24' }}>Notes </div></MenuItem></div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'reminder' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'reminder' })}> <MenuItem > <NotificationsOutlined titleAccess="Reminder" /> <div style={{ paddingLeft: "30px" }}>Reminders </div></MenuItem></div>
                        <hr style={{ width: "100%" }} />
                        <MenuItem>Label</MenuItem>
                        <div className="labels">

                            {this.props.labels.map((element) =>

                                <div style={{
                                    backgroundColor: this.state.activeClass === element.labelName ? '#F5EEC3' : ''
                                    , borderRadius: '0px 50px 50px 0px'
                                }} onClick={event => this.setState({ activeClass: element.labelName })} key={element._id}> <MenuItem  > <LabelOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px" }}> {element.labelName} </div></MenuItem></div>
                            )}
                        </div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'editLabel' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'editLabel' })}><MenuItem> <EditOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Edit Labels </div></MenuItem></div>
                        
                    <hr style={{ width: "100%" }} />
                    <div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'archive' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'archive' })}><MenuItem> <ArchiveOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Archive </div></MenuItem></div>
                        <div style={{
                            backgroundColor: this.state.activeClass === 'trash' ? '#F5EEC3' : ''
                            , borderRadius: '0px 50px 50px 0px'
                        }} onClick={event => this.setState({ activeClass: 'trash' })}><MenuItem> <DeleteOutline titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Trash</div></MenuItem></div>

                    </div>
                    <hr style={{ width: "100%" }} />

                    </Drawer>
                </div>
            </MuiThemeProvider >

        )
    }
}
export default SideNav;