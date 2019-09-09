const app = require('chai')
const should = require('chai').should()
const chaihttp = require('chai-http');
const server = require('../server')
const data = require('./test.json')
app.use(chaihttp)
app.use(require('chai-json-schema'))
let noteid;
/**
 * @description testing note api
 */
describe("Testing note api", () => {
    it("with right details", (done) => {
        app.request(server)
            .post('/note/createNotes')
            .send(data.notecreate)
            .end((err, res) => {
                noteid = {
                    id: res.body.data._id,
                    userId: data.userId
                }
                res.should.have.status(200)
                done()
            })
    })
    it('note can be empty', (done) => {
        app.request(server)
            .post('/note/createNotes')
            .send(data.userId)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("with wrong details", (done) => {
        app.request(server)
            .post('/note/createNotes')
            .send()
            .end((err, res) => {
                res.should.have.status(422)
                done()
            })
    })
})

describe('testing getNotes api ', () => {
    it('with right details', (done) => {
        app.request(server)
            .get('/note/getNotes')
            .send(data.userId)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it('with wrong details ', (done) => {
        app.request(server)
            .get('/note/getNotes')
            .send(data.userIderr)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})


describe("testing delete note api", () => {
    it('deleting api with right details', (done) => {
        console.log(noteid)
        app.request(server)
            .post('/note/deleteNotes')
            .send(noteid)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it('deleting api with wrong details', (done) => {
        app.request(server)
            .post('/note/deleteNotes')
            .send({})
            .end((err, res) => {
                res.should.have.status(422)
                done()
            })
    })
})

describe("testing update api ", () => {
    it('testing noteUpdate', (done) => {
        app.request(server)
            .post('/note/updateNotes')
            .send(data.updateNotes)
            .end((err, res) => {
                res.should.have.status(200)

                done()
            })
    })
    it('testing noteTrash', (done) => {
        app.request(server)
            .post('/note/noteTrash')
            .send(data.noteTrash)
            .end((err, res) => {
                res.should.have.status(200)

                done()
            })
    })
    it('testing noteArchive', (done) => {
        app.request(server)
            .post('/note/noteArchive')
            .send(data.noteArchive)
            .end((err, res) => {
                res.should.have.status(200)

                done()
            })
    })
    it('testing noteReminder', (done) => {
        app.request(server)
            .post('/note/noteReminder')
            .send(data.noteReminder)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})


describe('Testing Labels', () => {
    it('creating label ', (done) => {
        app.request(server)
            .post('/note/createLabel')
            .send(data.createLabel)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })

    })
    it('updating label', (done) => {
        app.request(server)
            .post('/note/updateLabel')
            .send(data.updateLabel)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })


    })
    it('get all  labels', (done) => {
        app.request(server)
            .get('/note/getLabels')
            .send(data.getLabel)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it('delete label', (done) => {
        app.request(server)
            .post('/note/deleteLabel')
            .send(data.deleteLabel)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })


    })

})