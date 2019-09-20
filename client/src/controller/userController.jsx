
import axios from 'axios'
// const baseUrl = "http://localhost:4000"
const headers = {
    "Content-Type": "application/json"
}
let loginControl = (payload) => {

    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/login', payload, { headers: headers })
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
        axios.get('http://localhost:4000/auth/google', { headers: headers })
            .then(response => {
                sessionStorage.setItem('UserSession', response.data.data)
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })

    })


}

let forgotPassword = (Email) => {
    let payload = {
        email: Email
    }
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/forgotPassword', payload, { headers: headers })
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
        axios.post('http://localhost:4000/register', payload, { headers: headers })
            .then(response => {

                resolve(response)
            })
            .catch(err => {
                reject(err)
            })

    })
}
export { loginControl, SocialLogin, forgotPassword, Register }