import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SearchRounded, RefreshSharp, ViewAgendaOutlined, ClearAll, GridOnOutlined, Settings } from '@material-ui/icons'
import Icon from '../../assets/icons8-google-keep.svg';
import { AppBar, Toolbar, InputBase, Card, createMuiTheme, MuiThemeProvider, Menu, MenuItem, ClickAwayListener, Avatar, Drawer } from '@material-ui/core';
import '../../App.css'
import SideNav from './sideNav';
// import SideNav from './sideNav';

const theme = createMuiTheme({
    overrides: {
        MuiToolbar: {
            root: {
                backgroundColor: "white",
                color: "#4D5656"
            }
        }

    }
})
class NavBar extends Component {
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

            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <AppBar >
                            <Toolbar className="NavBar">
                                <div>
                                    <IconButton onClick={event => this.state.sideToggle === true ? this.setState({ sideToggle: false }) : this.setState({ sideToggle: true })}>
                                        <MenuIcon />
                                    </IconButton>
                                </div>
                                <div className="label">
                                    <img src={Icon} width="50px" height="50px" alt="fundoo Icon" title="Fundoo Icon" />
                                    <h2> Fundoo</h2>
                                </div>
                                <Card className="NavCard" onKeyPress={this.search}>
                                    <div><SearchRounded style={{ margin: "13px" }} /></div>
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
                                    <div>{this.state.search !== '' ? <ClearAll style={{ margin: "12px" }} onClick={(event) => this.setState({ search: '' })} /> : ''}</div>
                                </Card>
                                <div><RefreshSharp style={{ margin: "13px" }} /></div>
                                <div>
                                    {this.state.View === false ? <ViewAgendaOutlined titleAccess="List View" className="" onClick={event => this.setState({ View: true })} /> : <GridOnOutlined titleAccess="Grid View" className="" onClick={event => this.setState({ View: false })} />}
                                </div>
                                <ClickAwayListener onClickAway={event => this.setState({ popOver: false })} >
                                    <div>

                                        <Settings titleAccess="settings" onClick={this.popper} />
                                        <Menu open={this.state.popOver} keepMounted
                                            anchorEl={this.state.anchorEl} style={{ top: "6%", width: "100%" }} autoFocus>
                                            <MenuItem >Settings</MenuItem>
                                            <MenuItem >EnableDarktheme</MenuItem>
                                            <MenuItem >send Feedback</MenuItem>
                                        </Menu>

                                    </div>
                                </ClickAwayListener>
                                <div>
                                    <Avatar alt='profile img' >M</Avatar></div>
                            </Toolbar>
                        </AppBar>
                        <SideNav sideToggle={this.state.sideToggle}
                            labels={this.state.labels} />

                    </div>
                </MuiThemeProvider>
            </div >
        )
    }

}
export default NavBar;