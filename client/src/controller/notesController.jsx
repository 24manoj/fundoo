import axios from 'axios'
import { messageService } from '../minddleware/middleWareServices'

/**
 * @description rxjs observers
 */
messageService.getMessage().subscribe(message => {
    if (message.text.key === 'updateNotes')
        updateNotes(message.text.value)
})

/**
 * @description updates notes with changes
 */
let updateNotes = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        axios.put(`${process.env.REACT_APP_BASE_URL}/note/updateNotes`, payload, { headers: headers })
            .then(notes => {
                console.log(notes);
            })
            .catch(err => {
                console.log(err);
            })

    } catch (err) {
        console.log(err);
    }
}

/**
 * @description gets all the notes from  backend
 */
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
                    console.log("notes", notes);

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



/**
 * @description gets search data from backend
 */
let searchText = (payload) => {
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

/**
 * @description creates new note
 */
let createNote = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
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
/**
 * @description update note with trash value
 */
let undoTrash = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteUnTrash`, payload, { headers: headers })
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

/**
 * @description Trash a note
 */
let NoteTrash = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteTrash`, payload, { headers: headers })
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

/**
 * @description updates archive state of note
 */
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


/**
 * @description makes http request to update color of note
 */
let updateColor = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
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
/**
 * @description makes http request to getlabels
 */
let getLabels = () => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
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

/**
 * @description makes http request to update Archive note
 */
let collaborateRemove = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/removeCollaborate`, payload, { headers: headers })
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

/**
 * @description makes http request to update Archive note
 */
let UndoArchive = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteUnArchive`, payload, { headers: headers })
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
/**
 * @description makes http request to update reminder of note
 */
let updateReminder = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteReminder`, payload, { headers: headers })
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
/**
 * @description makes http request to update reminder of note
 */
let undoReminder = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteUndoReminder`, payload, { headers: headers })
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

/**
 * @description makes http request to update collaborate of note
 */
let checkMail = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/userCheck`, payload, { headers: headers })
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
/**
 * @description makes http request to update note label
 */
let removeNoteLabel = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteUndoLabel`, payload, { headers: headers })
                .then(removed => {
                    resolve(removed)
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
 * @description makes http request to add label to note
 */
let addNoteLabel = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteLabel`, payload, { headers: headers })
                .then(removed => {
                    resolve(removed)
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
 * @description makes http request to 
 */
let createLabel = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/note/createLabel`, payload, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to get trash notes
 */
let getTrashNotes = () => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/note/getTrashNotes`, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to delete a specific note
 */
let deleteNotes = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/deleteNotes`, payload, { headers: headers })
                .then(deletd => {
                    resolve(deletd)
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
 * @description makes http request to get Archive notes
 */
let getArchiveNotes = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/note/getArchiveNotes`, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to restore trashed note
 */
let restoreNotes = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/noteUnTrash`, payload, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to updates label
 */
let updateLabel = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/updateLabel`, payload, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to delete label
 */
let deleteLabel = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/note/deleteLabel`, payload, { headers: headers })
                .then(created => {
                    resolve(created)
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
 * @description makes http request to update index of notes
 */
let updateIndex = (payload) => {
    try {
        const sessionValue = JSON.parse(sessionStorage.getItem(process.env.React_APP_STORAGE))
        const headers = {
            "Content-Type": "application/json",
            token: sessionValue.token
        }
        return new Promise((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_BASE_URL}/note/updateIndex`, payload, { headers: headers })
                .then(updated => {
                    resolve(updated)
                })
                .catch(err => {
                    reject(err)
                })
        })
    } catch (err) {
        console.log(err)

    }
}
export {
    getNotes, getLabels, searchText, createNote, updateColor, updateArchive, UndoArchive, updateReminder, undoReminder, updateIndex,
    removeNoteLabel, addNoteLabel, NoteTrash, undoTrash, createLabel, getArchiveNotes, getTrashNotes, deleteNotes, restoreNotes, updateLabel, deleteLabel,
    checkMail, collaborateRemove
}