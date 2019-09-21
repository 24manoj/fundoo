
import axios from 'axios'
import 'dotenv'

const headers = {
    "Content-Type": "application/json"
}
let loginControl = (payload) => {

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_BASE_URL}/login`, payload, { headers: headers })
            .then(response => {
                sessionStorage.setItem('UserSession', response.data.data)
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })

    })


}

let SocialLogin = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/auth/google`, { headers: headers })
            .then(response => {
                console.log(response)
                sessionStorage.setItem('UserSession', response.data.data)
                resolve(response)
            })
            .catch(err => {
                console.log("in controller", err)
                reject(err)
            })

    })


}

let forgotPassword = (Email) => {
    let payload = {
        email: Email
    }
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/forgotPassword`, payload, { headers: headers })
            .then(response => {

                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })

    })
}
let Register = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/register`, payload, { headers: headers })
            .then(response => {

                resolve(response)
            })
            .catch(err => {
                reject(err)
            })

    })
}
let Reset = (payload) => {
    return new Promise((resolve, reject) => {
        let url = window.location.search.split('=')
        axios.post(`${process.env.REACT_APP_BASE_URL}/resetPassword/${url[1]}`, payload, { headers: headers })
            .then(response => {

                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })


    })

}
export { loginControl, SocialLogin, forgotPassword, Register, Reset }