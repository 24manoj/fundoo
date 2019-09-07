const app = require('chai')
const should = require('chai').should()
const chaihttp = require('chai-http');
const server = require('../server')
const data = require('./test.json')
app.use(chaihttp)
app.use(require('chai-json-schema'))
/**
 * @desc Testing Login api ,with right details,empty details,Wrong details
 */
describe('API testing Login', () => {
    it('with right details', (done) => {
        app.request(server)
            .post('/login')
            .send(data.login)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it('with wrong details', (done) => {
        app.request(server)
            .post('/login')
            .send(data.loginerr)
            .end((err, res) => {
                res.should.have.status(422)
                done()
            })
    })
    it('with  null details', (done) => {
        app.request(server)
            .post('/login')
            .send({})
            .end((err, res) => {
                res.should.have.status(422)
                done()
            })
    })
})
/**
 * @desc Testing register api ,with right details,empty details,Wrong details
 */
describe('API testing register', () => {
    it('with user data exist details', (done) => {
        app.request(server)
            .post('/register')
            .send(data.register)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(404)
                done()
            })
    })
    it('with wrong details', (done) => {
        app.request(server)
            .post('/register')
            .send(data.registererr)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(422)
                done()
            })
    })
})

/**
 * @desc Testing forgotPassword api ,with right details,empty details,Wrong details
 */
describe('API testing forgotpassword', () => {
    it('with Email exist in database details', (done) => {
        app.request(server)
            .post('/forgotPassword')
            .send(data.forgotPassword)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200)
                done()
            })
    })
    it('with wrong details', (done) => {
        app.request(server)
            .post('/forgotPassword')
            .send(data.forgotPassworderr)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(404)
                done()
            })
    })
})

/**
 * @desc Testing resetPassword api ,with right details,empty details,Wrong details
 */
describe('API testing resetPassword', () => {
    it('with token generated', (done) => {
        app.request(server)
            .post(`/resetPassword/${data.token}`)
            .send(data.resetPassword)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it('with wrong details', (done) => {
        app.request(server)
            .post(`/resetPassword/`)
            .send(data.resetPassworderr)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(404)
                done()
            })
    })
})

