import React, { Component } from "react";
import { AccountBox, FormatAlignJustify } from '@material-ui/icons'
import { Card, CardActionArea, CardHeader, CardContent, FormControl, InputLabel, Input, FormHelperText, CardActions, Button } from '@material-ui/core';
import '../App.css'
class Login extends Component {
    render() {
        return (
            <div className='loginStyle'>
                <Card className='cardStyle'>

                    <CardContent>
                        <h1>Sign In</h1>
                        <FormControl>
                            <InputLabel htmlFor="email">Your Email </InputLabel>
                            <Input id="email" type="email" style={{ width: "300px" }} />
                            <FormHelperText id="email">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Your Password</InputLabel>
                            <Input id="password" type="password" style={{ width: "300px" }} />
                            <FormHelperText id="password">We'll never share your Password.</FormHelperText>
                        </FormControl>
                    </CardContent>
                    <CardActions style={{ textAlign: "center" }}>

                        <Button className="button" color="primary" variant='contained'>
                            Share
                               </Button>

                    </CardActions>
                </Card>

            </div >
        )
    }
}

export default Login