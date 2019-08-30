const axios = require('axios');
// import axios from "axios";
register = () => {
    console.log("inservices");
    return axios.get('http://localhost:4000/auth/google', {
        proxy: {
            host: 'https://localhost',
            port: 4000
        }
    })
        .then((res) => {
            console.log("http response ", res)
            let url = res.config.url
            window.open(url)
            console.log(url)

        }).catch((err) => {
            // alert(err + "::: User ALready Registred !!!Try Loging  in")
            console.log("front end", err);
        })
}

Login = (data) => {
    console.log("in services", data)
    return axios.post('/login', data)
        .then((res) => {
            console.log("http response ", res)
            res.json({
                redirectUrl: 'https://google.com'
            })
        })
        .catch((err) => {
            alert(err.errors + "Your are Not Regular User !!!Register plz")
            console.log("http Error", err.response);
        })
}
module.exports = { register, Login }