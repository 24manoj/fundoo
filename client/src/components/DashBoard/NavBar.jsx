import React, { Component } from 'react';
import { SearchRounded, RefreshSharp, ViewAgendaOutlined, ClearAll, GridOnOutlined, Settings } from '@material-ui/icons'
import Icon from '../../assets/icons8-google-keep.svg';
import { AppBar, Toolbar, InputBase, Card, createMuiTheme, MuiThemeProvider, Menu, MenuItem, ClickAwayListener, Avatar } from '@material-ui/core';
import '../../App.css'
import SideNav from './sideNav';
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
    constructor(props) {
        super(props);
        this.state = {
            Clear: false,
            search: '',
            View: false,
            popOver: false,
            anchorEl: null,
            animate: false,
            sideToggle: false,
            labels: ["hii", "hello", "bye"]
        }
    }
    popper = (event) => {
        this.setState({ anchorEl: event.currentTarget })
        this.state.popOver === true ? this.setState({ popOver: false }) : this.setState({ popOver: true })
    }
    NoteToogle = () => {
        console.log("in");

        this.setState({ View: !this.state.View })
        this.props.open(this.state.View)

    }
    refresh = async (event) => {
        console.log("in");

        this.setState({ animate: !this.state.animate })
        // event.currentTarget.style.animation = 'rotation 2s linear'


    }

    // this.setState({ animate: !this.state.animate })


    render() {
        let animateClass = this.state.animate ? 'rotate' : ''
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <div className="NavContent-Left">
                            <SideNav labels={this.props.labels} />
                            <img src={Icon} width="50px" height="50px" alt="fundoo Icon" title="Fundoo Icon" />
                            <div>  Fundoo</div>
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
                                <RefreshSharp className={animateClass} onClick={this.refresh} />
                                {this.state.View ? <ViewAgendaOutlined titleAccess="List View" className="" onClick={this.NoteToogle} /> : <GridOnOutlined titleAccess="Grid View" className="" onClick={this.NoteToogle} />}
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