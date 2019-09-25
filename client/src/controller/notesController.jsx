import axios from 'axios'
import { rejects } from 'assert'


let getNotes = () => {

    const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))

    const headers = {
        "Content-Type": "application/json",
        token: sessionValue.token
    }
    console.log(headers)
    return new Promise((resolve, rejecrt) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/note/getNotes`, { headers: headers })
            .then(notes => {
                resolve(notes)

            })
            .catch(err => {
                rejects(err)
            })
    })
}
export { getNotes }