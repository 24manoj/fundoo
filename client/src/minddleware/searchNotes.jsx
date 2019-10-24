
/********************************************************************************************************************
 * @Execution : default : cmd> npm start
 * @Purpose : fundoonotes reactjs
 * @description : Build a search componenet
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since :15-oct-2019
 *******************************************************************************************************************/
import {
    searchText
} from '../controller/notesController';

/**
 * @description filters the notes based on search payload
 * @param payload
 */
let searchNotes = (payload) => {
    var filt = [];
    let trash = [];
    let archive = [];
    return new Promise((resolve, reject) => {
        searchText(payload)
            //eslint-disable-next-line
            .then(searchData => {
                //eslint-disable-next-line
                searchData.data.data.hits.hits.map((element) => {
                    if (element._source.isTrash === false && element._source.isArchive === false)
                        filt.push(element._source);
                    else if (element._source.isTrash === true)
                        trash.push(element._source)
                    else
                        archive.push(element._source)
                })
                resolve({ filt, trash, archive })
            })
            .catch(err => {
                reject(err)
            })
    })
}
export { searchNotes }