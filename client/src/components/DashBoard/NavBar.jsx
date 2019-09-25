import React, { Component } from 'react';
import { SearchRounded, RefreshSharp, ViewAgendaOutlined, ClearAll, GridOnOutlined, Settings } from '@material-ui/icons'
import Icon from '../../assets/icons8-google-keep.svg';
import { AppBar, Toolbar, InputBase, Card, createMuiTheme, MuiThemeProvider, Menu, MenuItem, ClickAwayListener, Avatar } from '@material-ui/core';
import '../../App.css'
import SideNav from './sideNav';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'white',
                color: "#4D5656"
            }
        }
    }
})

class NavBar extends Component {
    sessionValue = JSON.parse(sessionStorage.getItem('UserSession'))
    Fname = this.sessionValue.data.firstName.slice(0, 1)
    constructor() {
        super();
        this.state = ({
            Clear: false,
            search: '',
            View: false,
            popOver: false,
            anchorEl: null,
            sideToggle: false,
            labels: ["hii", "hello", "bye"]
        })
    }
    popper = (event) => {
        this.setState({ anchorEl: event.currentTarget })
        this.state.popOver === true ? this.setState({ popOver: false }) : this.setState({ popOver: true })
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <div className="NavContent-Left">
                            <SideNav />
                            <img src={Icon} width="50px" height="50px" alt="fundoo Icon" title="Fundoo Icon" />
                            <h4> Fundoo</h4>
                        </div>
                        <div className="appBar">
                            <div className="NavContent">
                                <Card className="NavCard" onKeyPress={this.search}>
                                    <SearchRounded style={{ marginTop: "13px" }} />
                                    <InputBase
                                        placeholder="Search"
                                        rowsMax="10"
                                        type="string"
                                        margin="dense"
                                        autoComplete="true"
                                        fullWidth
                                        value={this.state.search}
                                        onChange={event => this.setState({ search: event.target.value })}
                                    />
                                    <div>{this.state.search !== '' ? <ClearAll style={{ marginTop: "12px" }} onClick={(event) => this.setState({ search: '' })} /> : ''}</div>
                                </Card>
                                <RefreshSharp />

                                {this.state.View === false ? <ViewAgendaOutlined titleAccess="List View" className="" onClick={event => this.setState({ View: true })} /> : <GridOnOutlined titleAccess="Grid View" className="" onClick={event => this.setState({ View: false })} />}
                                <ClickAwayListener onClickAway={event => this.setState({ popOver: false })} >
                                    <Settings titleAccess="settings" onClick={this.popper} />
                                </ClickAwayListener>
                                <div>
                                    <Menu open={this.state.popOver}
                                        anchorEl={this.state.anchorEl}>
                                        <MenuItem >Settings</MenuItem>
                                        <MenuItem >EnableDarktheme</MenuItem>
                                        <MenuItem >send Feedback</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <Avatar alt='profile img' >{this.Fname}</Avatar>

                        </div>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        )
    }
}
export default NavBar;