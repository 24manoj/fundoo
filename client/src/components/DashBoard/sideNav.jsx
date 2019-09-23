import React, { Component } from 'react';
import { Drawer, MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { EmojiObjectsOutlined, NotificationsOutlined, LabelOutlined, EditOutlined, ArchiveOutlined, DeleteOutline } from '@material-ui/icons'
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
        // console.log(this.props)
        this.state = {

        }

    }
    render() {
        console.log("in render  " + this.props.sideToggle);

        return (
            <MuiThemeProvider theme={theme}>
            
                    <Drawer className="sideNav" anchor="left" open={this.props.sideToggle} variant="persistent" onClose={event => this.setState({ sideToggle: false })} >
                        <div> <MenuItem  > <EmojiObjectsOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px" }}>Notes </div></MenuItem></div>
                        <div> <MenuItem  > <NotificationsOutlined titleAccess="Reminder" /><div style={{ paddingLeft: "30px" }}>Reminders </div></MenuItem></div>
                        <hr style={{ width: "100%" }} />
                        <div className="labels">
                            <MenuItem>Label</MenuItem>
                            {this.props.labels.map((element, key) =>

                                <div key={key}> <MenuItem  > <LabelOutlined titleAccess="Notes" /><div style={{ paddingLeft: "30px" }}> {element} </div></MenuItem></div>
                            )}
                            <div><MenuItem> <EditOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Edit Labels </div></MenuItem></div>
                        </div>
                        <hr style={{ width: "100%" }} />
                        <div>
                            <div><MenuItem> <ArchiveOutlined titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Archive </div></MenuItem></div>
                            <div><MenuItem> <DeleteOutline titleAccess="Edit Label" /><div style={{ paddingLeft: "30px" }}> Trash</div></MenuItem></div>

                        </div>
                        <hr style={{ width: "100%" }} />

                    </Drawer>
                
            </MuiThemeProvider>

        )
    }
}
export default SideNav;