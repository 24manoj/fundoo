
import axios from 'axios'
// const baseUrl = "http://localhost:4000"
let loginControl = (payload) => {
    var headers = {
        "Content-Type": "application/json"
    }
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/login', payload, { headers: headers })
            .then(response => {
                console.log("data" + JSON.stringify(response.data.data));
                resolve(response)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })

    })


}
export { loginControl }