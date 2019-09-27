
import axios from 'axios'
import 'dotenv'
const headers = {
    "Content-Type": "application/json",
}
let ProfileUpload = (payload) => {
    const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
    const data = new FormData();
    data.append("image", payload);
    console.log("data" + data);
    const profileheader = {
        "Content-Type": "multipart/form-data",
        token: sessionValue.token
    }

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, data, { headers: profileheader })
            .then(uploaded => {
                resolve(uploaded)
            })
            .catch(err => {
                reject(err)
                console.log(err);

            })
    })
}
let loginControl = (payload) => {

    return new Promise((resolve, reject) => {

        axios.post(`${process.env.REACT_APP_BASE_URL}/login`, payload, { headers: headers })
            .then(response => {

                sessionStorage.setItem('UserSession', JSON.stringify(response.data.data))
                console.log(response.data)
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

                sessionStorage.setItem('UserSession', response.data.data)
                resolve(response)
            })
            .catch(err => {

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
export { loginControl, SocialLogin, forgotPassword, Register, Reset, ProfileUpload }