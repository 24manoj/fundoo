const axios = require('axios');
// import axios from "axios";
register = (data) => {
    console.log("in services", data)
    return axios.post('/register', data)
        .then((res) => {
            console.log("http response ", res)
        }).catch((err) => {
            alert(err.response.data.errors + "::: User ALready Registred !!!Try Loging  in")
            console.log("http Error", err.response);
        })
}

Login = (data) => {
    console.log("in services", data)
    return axios.post('/login', data)
        .then((res) => {
            console.log("http response ", res)
        }).catch((err) => {
            alert(err.response.data.errors + "Your are Not Regular User !!!Register plz")
            console.log("http Error", err.response);
        })
}
module.exports = { register, Login }