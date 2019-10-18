import {
    searchText
} from '../controller/notesController';

let searchNotes = (payload) => {
    var filt = [];
    let trash = [];
    let archive = [];
    return new Promise((resolve, reject) => {
        searchText(payload)
            .then(searchData => {

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