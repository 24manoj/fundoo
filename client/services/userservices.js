const axios = require('axios');
// import axios from "axios";
login = () => {
    console.log("inservices");
    return axios.get('http://8c56f7f8.ngrok.io/auth/google')
        .then((res) => {
            console.log("http response ", res)
        }).catch((err) => {
            // alert(err + "::: User ALready Registred !!!Try Loging  in")
            console.log("front end", err);
        })
}
module.exports = { login }