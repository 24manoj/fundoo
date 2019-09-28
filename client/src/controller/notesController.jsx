import axios from 'axios'

let getNotes = () => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))

        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/note/getNotes`, { headers: headers })
                .then(notes => {
                    resolve(notes)

                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    catch (err) {
        console.log(err);

    }
}



let getLabels = () => {
    try {

        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        console.log(sessionValue.token)
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/note/getLabels`, { headers: headers })
                .then(notes => {
                    resolve(notes)

                })
                .catch(err => {
                    reject(err)
                })
        })
    } catch (err) {
        console.log(err);

    }
}

export { getNotes, getLabels }