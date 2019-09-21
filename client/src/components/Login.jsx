import React, { Component } from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import Glogo from '../assets/google_icon.png'
import { Cancel } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Card, Fab, Button, MuiThemeProvider, TextField, Snackbar, DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import '../App.css'
import { loginControl, SocialLogin, forgotPassword } from '../controller/userController'



const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "30px"
            }

        }
    }
})
class Login extends Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
            EmailError: "",
            passwordError: "",
            Errors: "",
            stackBar: false,
            stackBarMessage: "",
            DailogShow: false,
            resetMail: ''
        }

    }
    validateInput = (event) => {
        let passwordRegex = /^[a-zA-Z0-9]{8,}/;
        let EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const userName = event.target.value;
        if (event.target.name === 'Email') {
            this.setState({
                userName: event.target.value
            })
            if (!(EmailRegex.test(userName))) {
                this.setState({
                    EmailError: `Not a valid ${event.target.name}`
                })

            }
            else {
                this.setState({
                    EmailError: ''
                })

            }
        } else {
            this.setState({
                password: event.target.value
            })
            if (!passwordRegex.test(event.target.value)) {
                this.setState({
                    passwordError: ` ${event.target.name} Should contain min 8 characters `
                })

            }
            else {
                this.setState({
                    passwordError: ''
                })

            }
        }

    }
    SubmitData = (event) => {
        if (this.state.EmailError === '' && this.state.passwordError === '' && this.state.userName !== '' && this.state.password !== '') {
            let payload = {
                email: this.state.userName,
                password: this.state.password
            }
            loginControl(payload)
                .then(response => {

                    this.setState({
                        stackBar: true,
                        stackBarMessage: "Loged In sucessfully !!! happy Notes"
                    })

                })
                .catch(err => {
                    this.setState({
                        stackBar: true,
                        stackBarMessage: "UnAuthorize Access!!!??"
                    })

                })
        }
        else {
            if (this.state.userName === '' || this.state.EmailError !== '') {
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Email Invalid"
                })
            }
            else if (this.state.password === '' || this.state.passwordError !== '') {
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Password must have min 8 characters"
                })

            }

        }
    }
    snackbarClose = () => this.setState({ stackBar: false })
    GoogleLogin = () => {
        SocialLogin()
            .then(LoginSucess => this.setState({
                stackBar: true,
                stackBarMessage: "Loged In sucessfully !!! happy Notes"
            })
            )
            .catch(err => this.setState({
                stackBar: true,
                stackBarMessage: "UnAuthorize Access!!!??"
            })
            )
    }
    forgotPassword = () => {
        let EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (this.state.resetMail === '' || !EmailRegex.test(this.state.resetMail)) {

            this.setState({
                stackBar: true,
                stackBarMessage: "Not a valid mail!!!!!!!"
            })
        }
        else {
            forgotPassword(this.state.resetMail)
                .then(res => {
                    this.setState({
                        stackBar: true,
                        stackBarMessage: " Reset Link sent Sucessfully",
                        resetMail: ''
                    })
                    this.DailogClose();
                })
                .catch(err => {
                    this.setState({
                        stackBar: true,
                        stackBarMessage: "Entered mail not Found!!!???",
                        resetMail: ''
                    })

                })
        }
    }
    DailogShow = () => this.setState({ DailogShow: true })
    DailogClose = () => this.setState({ DailogShow: false })
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className='Style'>
                    <Card className='cardStyle'>
                        <h2>
                            <span style={{ color: "#7536BD" }}>F</span>
                            <span style={{ color: "#D17FE0" }}>U</span>
                            <span style={{ color: "#4862AE" }}>N</span>
                            <span style={{ color: "#34495E", fontSize: "25pt" }}>D</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                        </h2>
                        <h3>Sign In</h3>
                        <div>
                            <div>
                                <TextField
                                    required
                                    label="Your Email"
                                    type="email"
                                    name="Email"
                                    placeholder="abc@gmail.com"
                                    helperText={this.state.userName === '' || this.state.EmailError === '' ? 'Well never share your Email ' : <span style={{ color: "red" }} > {this.state.EmailError}</span>}
                                    value={this.state.userName}
                                    onChange={this.validateInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    label="Your Password"
                                    type="password"
                                    placeholder="******************"
                                    name="password"
                                    helperText={this.state.password === '' || this.state.passwordError === '' ? 'Well never share your Password ' : <span style={{ color: "red" }}>{this.state.passwordError}</span>}
                                    value={this.state.password}
                                    onChange={this.validateInput}
                                />
                            </div>
                        </div>
                        <div className="card-Forgot" onClick={this.DailogShow}>Forgot Password?</div>
                        <br />
                        <div>
                            <Button className="SignButton" color="primary" variant='contained' onSubmit={this.SubmitData}>
                                Sign In
                               </Button>
                        </div>
                        <p> Or Sign In with:</p>
                        <div>
                            <Fab> <img src={Glogo} width="100%" height="50vh" alt='avathar' onClick={this.GoogleLogin} /></Fab>
                        </div>
                        <hr />
                        <p>Not a member? <Link to='/register'><span style={{ color: "Blue" }}> Sign Up here</span></Link></p>
                        <div></div>
                    </Card>
                </div>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={this.state.stackBar}
                        autoHideDuration={6000}
                        message={this.state.stackBarMessage}
                        onClose={this.snackbarClose}
                        action={
                            <Cancel onClick={this.snackbarClose} />
                        }
                    />
                </div>
                <div>
                    <Dialog open={this.state.DailogShow} onClose={this.DailogClose}  >
                        <DialogTitle >Reset your password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter your email address and we will send you a link to reset your password.
                            </DialogContentText>
                            <TextField

                                type="email"
                                label="Your Mail"
                                helperText="Never share Your UserID and Password To anyOne"
                                name="resetMail"
                                value={this.state.resetMail}
                                onChange={event => this.setState({ resetMail: event.target.value })}
                                fullWidth
                            />
                            <DialogActions  >
                                <Button onClick={this.forgotPassword} color="primary" variant="contained">
                                    Send
                                   </Button>
                                <DialogActions  >
                                    <Button onClick={this.DailogClose} color="primary" variant="contained">
                                        Cancel
                                   </Button>
                                </DialogActions>
                            </DialogActions>
                        </DialogContent>

                    </Dialog>
                </div>
            </MuiThemeProvider >

        )
    }
}

export default Login