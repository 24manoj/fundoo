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


let searchText = (payload) => {
    console.log("payload" + JSON.stringify(payload));

    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            token: sessionValue.token
        }

        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/elastic/search`, payload, { headers: headers })
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
let createNote = (payload) => {
    try {

        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        console.log(sessionValue.token)
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/note/createNotes`, payload, { headers: headers })
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

let updateArchive = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteArchive`, payload, { headers: headers })
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


let updateColor = (payload) => {
    try {

        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        console.log(sessionValue.token)
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/updateColor`, payload, { headers: headers })
                .then(colorUpdate => {
                    resolve(colorUpdate)

                })
                .catch(err => {
                    reject(err)
                })
        })
    } catch (err) {
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

export { getNotes, getLabels, searchText, createNote, updateColor, updateArchive }