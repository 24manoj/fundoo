import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SearchRounded, Clear, RefreshSharp } from '@material-ui/icons'
import Icon from '../../assets/icons8-google-keep.svg';
import { AppBar, Toolbar, InputBase, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import '../../App.css'
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
            search: ''
        })
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar className="NavBar">
                    <Toolbar>
                        <div>
                            <IconButton >
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
                            <div>{this.state.search !== '' ? <Clear style={{ margin: "20px" }} onClick={event => this.setState({ search: '' })} /> : ''}</div>
                        </Card>
                        <div><RefreshSharp style={{ margin: "13px" }} /></div>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        )
    }

}
export default NavBar;