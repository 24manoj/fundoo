
import axios from 'axios'
import 'dotenv'
const headers = {
    "Content-Type": "application/json",
}

/**
 * @description sends http request to backend for pic upload
 */
let ProfileUpload = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const data = new FormData();
        data.append("image", payload);
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
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description verify users
 */
let loginControl = (payload) => {
    try {
        console.log("process", process.env.REACT_APP_BASE_URL);

        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/login`, payload, { headers: headers })
                .then(response => {
                    sessionStorage.setItem('UserSession', JSON.stringify(response.data.data))
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
        })

    } catch (err) {
        console.log(err);
    }
}

/**
 * @description verifies user with google
 */
let SocialLogin = () => {
    try {
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

    } catch (err) {
        console.log(err);

    }
}

/**
 * @description takes email verifies sends a reset link  
 */
let forgotPassword = (Email) => {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description registers new user
 */
let Register = (payload) => {
    try {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/register`, payload, { headers: headers })
                .then(response => {

                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
        })
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description updates password 
 */
let Reset = (payload) => {
    try {
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
    } catch (err) {
        console.log(err);

    }

}
export { loginControl, SocialLogin, forgotPassword, Register, Reset, ProfileUpload }