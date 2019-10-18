

/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a Reset componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import React, { Component } from 'react'
import { Card, TextField, Button, createMuiTheme, MuiThemeProvider, Snackbar } from '@material-ui/core'
import { Cancel } from '@material-ui/icons';
import { Reset } from '../controller/userController'
const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "30px"
            }

        }
    }
})
class ResetPassword extends Component {
    constructor() {
        super();
        this.state = ({
            NewPassword: '',
            ConfirmPassword: '',
            NewPasswordError: '',
            ConfirmError: '',
            Snackbar: false,
            SnackbarMessage: ''
        })
    }
    /**
     * @description validates for the email and password
     */
    Validate = (event) => {
        let PasswordRegx = /^[a-zA-Z0-9]{8,}/
        if (event.target.name === 'NewPassword') {
            this.setState({
                NewPassword: event.target.value
            })
            if (!PasswordRegx.test(this.state.NewPassword)) {
                this.setState({
                    NewPasswordError: 'character should be more or 8'
                })
            } else {
                this.setState({
                    NewPasswordError: ''
                })
            }
        } else {
            this.setState({
                ConfirmPassword: event.target.value
            })
            if (!PasswordRegx.test(this.state.ConfirmPassword)) {
                this.setState({
                    ConfirmError: 'password should  contain 8 or more characters '
                })
            } else {
                this.setState({
                    ConfirmError: ''
                })
            }

        }

    }
    /**
    * @description validates  given details,give approprate message
    */
    Reset = () => {
        if (this.state.NewPasswordError !== '' || this.state.NewPassword === '' || this.state.ConfirmError !== '' || this.state.ConfirmPassword === '') {
            this.setState({
                Snackbar: true,
                SnackbarMessage: 'Not a Valid Password'
            })
        } else {
            if (this.state.NewPassword === this.state.ConfirmPassword) {
                let payload = {
                    password: this.state.NewPassword,
                    confirmPassword: this.state.ConfirmPassword
                }
                Reset(payload)
                    .then(response => {
                        this.setState({
                            Snackbar: true,
                            SnackbarMessage: 'Password set Sucessfully !!1 happy Noting'
                        })
                        this.props.history.push('/')
                    })
                    .catch(err => {
                        this.setState({
                            Snackbar: true,
                            SnackbarMessage: 'Token Expired'
                        })
                    })
            } else {
                this.setState({
                    Snackbar: true,
                    SnackbarMessage: 'Passwords Mismatch!!!Check  Passwords'

                })
            }
        }

    }

    SnackbarClose = () => this.setState({ Snackbar: false })

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="Style">
                    <Card className="cardStyleReset">
                        <h2>
                            <span style={{ color: "#7536BD" }}>F</span>
                            <span style={{ color: "#D17FE0" }}>U</span>
                            <span style={{ color: "#4862AE" }}>N</span>
                            <span style={{ color: "#34495E", fontSize: "25pt" }}>D</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                        </h2>
                        <h5> Reset </h5>
                        <div>
                            <div>
                                <TextField
                                    id="NewPassword"
                                    label="New Password"
                                    type="password"
                                    helperText={(this.state.NewPassword === '' | this.state.NewPasswordError === '') ? "Never Share User`Id and Password" : <span style={{ color: "red" }}>{this.state.NewPasswordError}</span>}
                                    name="NewPassword"
                                    value={this.state.NewPassword}
                                    onChange={this.Validate}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="ConfirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    helperText={(this.state.CofirmPassword === '' | this.state.ConfirmError === '') ? "Never Share User`Id and Password" : <span style={{ color: "red" }}>{this.state.ConfirmError}</span>}
                                    name="ConfirmPassword"
                                    value={this.state.ConfirmPassword}
                                    onChange={this.Validate}

                                />
                            </div>
                            <br />
                            <div>
                                <Button className="SignButton" variant="contained" color="primary" type="submit" onClick={this.Reset}>
                                    Reset
                        </Button>
                            </div>
                        </div>
                        <br />
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"

                            }}
                            open={this.state.Snackbar}
                            onClose={this.SnackbarClose}
                            message={this.state.SnackbarMessage}
                            autoHideDuration={4000}
                            action={
                                <Cancel onClick={this.SnackbarClose} />
                            }

                        />

                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ResetPassword;