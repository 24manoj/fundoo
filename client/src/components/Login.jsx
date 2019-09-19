import React, { Component } from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import Glogo from '../assets/google_icon.png'
import { Cancel } from '@material-ui/icons'
import { Card, Fab, Button, MuiThemeProvider, TextField, Snackbar, SnackbarContent } from '@material-ui/core';
import '../App.css'
import { loginControl } from '../controller/userController'
import { fontSize } from "@material-ui/system";


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
            stackBarMessage: ""
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
                    passwordError: `Not a valid ${event.target.name}`
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
                    console.log("data in frontend==>" + JSON.stringify(response.data.data));


                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            if (this.state.EmailError === '') {
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Email Invalid"
                })
            }
            else if (this.state.passwordError === '') {
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Password Invalid "
                })

            }
            else {
                this.setState({
                    stackBar: true,
                    stackBarMessage: "Clear Errors to Proceed "
                })

            }
        }
    }
    snackbarClose = () => this.setState({ stackBar: false })

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className='loginStyle'>
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
                            <TextField
                                required
                                label="Your Email"
                                type="email"
                                name="Email"
                                placeholder="abc@gmail.com"
                                helperText={this.state.userName === '' || this.state.EmailError === '' ? 'Well never share your Email ' : this.state.EmailError}
                                value={this.state.userName}
                                onChange={this.validateInput}
                            />

                            <TextField
                                required
                                label="Your Password"
                                type="password"
                                placeholder="******************"
                                name="password"
                                helperText={this.state.password === '' || this.state.passwordError === '' ? 'Well never share your Password ' : this.state.passwordError}
                                value={this.state.password}
                                onChange={this.validateInput}
                            />
                        </div>
                        <p className="card-Forgot" >Forgot Password?</p>

                        <div>
                            <Button className="SignButton" color="primary" variant='contained' onClick={this.SubmitData}>
                                Sign In
                               </Button>
                        </div>
                        <p> Or Sign In with:</p>
                        <div>
                            <Fab> <img src={Glogo} width="100%" height="50vh" alt='avathar' /></Fab>
                        </div>
                        <hr />
                        <p>Not a member? <span style={{ color: "Blue" }}> Sign Up here</span></p>
                        <div></div>
                    </Card>
                </div>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        open={this.state.stackBar}
                        message={this.state.stackBarMessage}
                        autoHideDuration={3000}
                        onClose={this.snackbarClose}
                        variant="sucess"
                        action={
                            <Cancel onClick={this.snackbarClose} />
                        }
                    />
                    <SnackbarContent
                    
                    />
                </div>
            </MuiThemeProvider>

        )
    }
}

export default Login