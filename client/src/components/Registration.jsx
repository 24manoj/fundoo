import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {
    TextField, Button, MuiThemeProvider, Card, Snackbar, createMuiTheme
} from "@material-ui/core";
import '../App.scss';
import { Register } from '../controller/userController'
import { Cancel } from '@material-ui/icons';
const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "30px"
            }

        }
    }
})
class Registration extends Component {
    constructor() {
        super()
        this.state = {
            fname: "",
            password: "",
            lname: "",
            email: "",
            fnameError: "",
            lnameError: "",
            EmailError: "",
            passwordError: "",
            Errors: "",
            stackBar: false,
            stackBarMessage: "",
            DailogShow: false,
            resetMail: ''
        }
    }
    snackbarClose = () => this.setState({ stackBar: false })
    /**
    * @desc validates fields for empty and  regex match,alerts with approprate msgs
    * @param event event conatins the value and details of each field
    */
    validateInput = (event) => {
        let passwordRegex = /^[a-zA-Z0-9]{8,}/;
        let EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const email = event.target.value;
        if (event.target.name === 'email') {
            this.setState({
                email: event.target.value
            })
            if (!(EmailRegex.test(email))) {
                this.setState({
                    EmailError: `Not a valid ${event.target.name}`
                })
            }
            else {
                this.setState({
                    EmailError: ''
                })
            }
        } else if (event.target.name === 'password') {
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
        else if (event.target.name === 'fname') {
            this.setState({
                fname: event.target.value
            })
            if (this.state.fname.length < 4) {
                this.setState({
                    fnameError: "FirstName Can`t be < 4"
                })
            } else {
                this.setState({
                    fnameError: ''
                })
            }

        }
        else {
            this.setState({
                lname: event.target.value
            })
        }
    }

    /**
    * @desc checks for data,collects data and pass data to controller ,handles data using promises

    */
    Register = () => {
        if (this.state.fname === '' || this.state.fnameError !== '') {
            this.setState({
                stackBar: true,
                stackBarMessage: 'Not a valid First Name'

            })
        } else if (this.state.password === '' || this.state.passwordError !== '') {
            this.setState({
                stackBar: true,
                stackBarMessage: 'Not a valid Password'

            })
        }
        else if (this.state.email === '' || this.state.EmailError !== '') {
            this.setState({
                stackBar: true,
                stackBarMessage: 'Not a valid Email'
            })

        }
        else {

            let payload = {
                firstName: this.state.fname,
                lastName: this.state.lname,
                email: this.state.email,
                password: this.state.password
            }
            Register(payload)
                .then(response => {
                    console.log("response------", response);

                    this.setState({
                        stackBarMessage: "Registred Sucessfully",
                        stackBar: true

                    })
                    this.props.history.push('/');
                })
                .catch(err => {
                    console.log("err------------", err)
                    this.setState({
                        stackBarMessage: "Email Not Active or Already  Registred",
                        stackBar: true
                    })

                })
        }

    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className='Style'>
                    <Card className='cardStyleRegister'>
                        <h2>
                            <span style={{ color: "#7536BD" }}>F</span>
                            <span style={{ color: "#D17FE0" }}>U</span>
                            <span style={{ color: "#4862AE" }}>N</span>
                            <span style={{ color: "#34495E", fontSize: "25pt" }}>D</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                            <span style={{ color: "#FA6121" }}>O</span>
                        </h2>
                        <h3>Sign Up</h3>
                        <div>
                            <div>
                                <TextField
                                    id='Fname'
                                    required
                                    label="Your FirstName"
                                    type="text"
                                    name="fname"
                                    placeholder="Jhon"
                                    helperText={this.state.fname === '' || this.state.fnameError === '' ? 'We`ll never share your Details' : <span style={{ color: "red" }} > {this.state.fnameError}</span>}
                                    value={this.state.fname}
                                    onChange={this.validateInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id='Lname'
                                    required
                                    label="Your LastName"
                                    type="text"
                                    name="lname"
                                    placeholder="Smith"
                                    helperText={this.state.lname === '' ? 'We`ll never share your Details ' : ''}
                                    value={this.state.lname}
                                    onChange={this.validateInput}
                                />
                            </div>

                            <div>
                                <TextField
                                    id='Password'
                                    required
                                    label="Your Password"
                                    type="password"
                                    placeholder="******************"
                                    name="password"
                                    helperText={this.state.password === '' || this.state.passwordError === '' ? 'We`ll never share your Password ' : <span style={{ color: "red" }}>{this.state.passwordError}</span>}
                                    value={this.state.password}
                                    onChange={this.validateInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id='Email'
                                    required
                                    label="Your Email"
                                    type="email"
                                    name="email"
                                    placeholder="abc@gmail.com"
                                    helperText={this.state.email === '' || this.state.EmailError === '' ? 'We`ll never share your Details' : <span style={{ color: "red" }} > {this.state.EmailError}</span>}
                                    value={this.state.email}
                                    onChange={this.validateInput}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <Button variant="contained" color="primary" className="SignButton" onSubmit={this.Register}> Sign Up</Button>
                        </div>
                        <hr />
                        <p>Have an Account ? <Link to='/'><span style={{ color: "Blue" }}> Sign In</span></Link></p>
                    </Card>
                    <div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={this.state.stackBar}
                            autoHideDuration={4000}
                            message={this.state.stackBarMessage}
                            onClose={this.snackbarClose}
                            action={
                                <Cancel onClick={this.snackbarClose} />
                            }
                        />
                    </div>
                </div>
            </MuiThemeProvider>


        )

    }
}
export default Registration;