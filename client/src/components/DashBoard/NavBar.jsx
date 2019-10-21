
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : create appbar componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from 'react';
import { SearchRounded, RefreshSharp, ViewAgendaOutlined, ClearAll, GridOnOutlined, Settings } from '@material-ui/icons'
import Icon from '../../assets/icons8-google-keep.svg';
import { AppBar, Toolbar, Card, createMuiTheme, MuiThemeProvider, Menu, MenuItem, ClickAwayListener, Avatar, Paper, Popper, Button } from '@material-ui/core';
import '../../App.scss';
import { withRouter } from 'react-router-dom'
import SideNav from './sideNav';
import Search from './Search'
import { ProfileUpload } from '../../controller/userController.jsx'
/**
 * @description overriding theme
 */
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'white',
                color: "#4D5656"
            },
            positionFixed: {
                position: 'unset'
            },

        }
    }
})
class NavBar extends Component {
    /**
     * @desc get value from session storage
     */
    sessionValue = JSON.parse(sessionStorage.getItem('UserSession'))
    Fname = this.sessionValue.data.firstName.slice(0, 1)
    constructor(props) {
        super(props);
        this.state = {
            Clear: false,
            search: '',
            View: true,
            popOver: false,
            anchorEl: null,
            animate: false,
            sideToggle: false,
            profile: false,
            hideNav: false,
            profileUrl: this.sessionValue.data.url
        }
    }
    /**
     * @description handels popper
     */
    popper = (event) => {
        this.setState({ anchorEl: event.currentTarget })
        this.state.popOver === true ? this.setState({ popOver: false }) : this.setState({ popOver: true })
    }
    /**
    * @description handels sidenav toggle
    */
    NoteToogle = () => {
        this.setState({ View: !this.state.View })
        this.props.open(this.state.View)
    }
    /**
    * @description handels refresh button 
    */
    refresh = async () => {
        await this.setState({ animate: !this.state.animate })
        this.props.refresh(this.state.animate)
    }

    /**
       * @description handels sign out
       */
    SignOut = (event) => {
        sessionStorage.clear();
        this.props.history.push('/')

    }
    /**
    * @description handels profile upload
    */
    profile = (event) => {
        try {
            this.setState({
                profileUrl: URL.createObjectURL(event.target.files[0])
            })
            let image = event.target.files[0];
            ProfileUpload(image)
                .then(upload => {
                    let profile = this.sessionValue
                    sessionStorage.clear()
                    profile.data.url = upload.data.data
                    sessionStorage.setItem(process.env.REACT_APP_STORAGE, JSON.stringify(profile))
                })
                .catch(err => {
                    console.log(err);

                })
        } catch (err) {
            console.log(err);

        }
    }
    /**
    * @description handels search notes
    */
    searchData = (event) => {
        this.props.onSearch(this.state.search)
    }
    /**
       * @description handels labels search
       */
    search = (state, filt, trash, archive) => {
        this.props.search(state, filt, trash, archive)
    }
    hideNav = (value) => {
        this.setState({ hideNav: value })
    }
    render() {
        let animateClass = this.state.animate ? 'rotate' : ''
        const activeClass = this.props.title !== undefined ? this.props.title : undefined


        return (
            <MuiThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <div className={this.state.hideNav ? "hideDiv" : "NavContent-Left"}>
                            <SideNav labels={this.props.labels} active={activeClass} />
                            <img src={Icon} width="50px" height="50px" alt="fundoo Icon" title="Fundoo Icon" />
                            <div className="title">  {this.props.title !== undefined ? this.props.title : 'Fundoo'}</div>
                        </div>
                        <div className="appBar">
                            <div className="NavContent">
                                <Search search={this.search} hideNav={this.hideNav} />
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
                            <Avatar alt='profile img' src={this.state.profileUrl} onClick={event => this.setState({ anchorEl: event.currentTarget, profile: !this.state.profile })}>{this.Fname} </Avatar>

                        </div>

                        <Popper open={this.state.profile} anchorEl={this.state.anchorEl} placement={'bottom-end'} style={{ marginTop: '25px' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={event => this.setState({ profile: false })}>
                                    <Card className='profileCard' >
                                        <div className="Avatar">
                                            <label htmlFor='file'>

                                                <Avatar alt='profile img' src={this.state.profileUrl} titleAccess="change Profile" style={{
                                                    width: '100px',
                                                    height: '100px',

                                                }} >
                                                    {this.Fname}
                                                </Avatar>
                                                <input type='file' id='file' onChange={this.profile} style={{ display: 'none' }} />

                                            </label>
                                            <div className="Avatar-text">
                                                <h1>{this.sessionValue.data.firstName}</h1>
                                                <h4>{this.sessionValue.data.email}</h4>

                                            </div>
                                        </div>
                                        <hr style={{ width: "100%" }} />
                                        <div className="Avatar-button">
                                            <div>
                                                <Button variant='contained' type='submit' >AddAccount</Button>
                                            </div>
                                            <div>
                                                <Button variant='contained' type="reset" onClick={this.SignOut}>SignOut
                                        </Button></div>
                                        </div>
                                    </Card>
                                </ClickAwayListener>
                            </Paper>
                        </Popper>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        )
    }
}
export default withRouter(NavBar);