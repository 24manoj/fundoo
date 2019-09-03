const axios = require('axios');
const cors = require('cors')
// import axios from "axios";
login = () => {
    console.log("inservices");
    return axios.get('/auth/google', cors())
        .then((res) => {
            console.log("http response ", res)
        }).catch((err) => {
            // alert(err + "::: User ALready Registred !!!Try Loging  in")
            console.log("front end", err);
        })
}
module.exports = { login }