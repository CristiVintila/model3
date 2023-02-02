let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('authors', () => {
	describe('/PUT authors/id and /DELETE authors/id', () => {
		before((done) => {
			chai.request(server)
				.get('/create')
				.send()
				.end((err, res) => {
					res.should.have.status(201)
					should.exist(res.body)
					res.body.should.have.property('message').eql('created')
					done()
				})			
		})
		it('it should return an error', (done) => {
			chai.request(server)
				.put('/authors/13')
				.send({name : '', email : '', address : ''})
				.end((err, res) => {
					res.should.have.status(404)
					should.exist(res.body)
					res.body.should.have.property('message').eql('not found')
					done()
				})
		})
		it('it should modify an author', (done) => {
			chai.request(server)
				.put('/authors/5')
				.send({name : 'test', email : 'test@test.com', address : 'test'})
				.end((err, res) => {
					res.should.have.status(202)
					should.exist(res.body)
					res.body.should.have.property('message').eql('accepted')
					done()
				})
		})
		it('result should be what we sent', (done) => {
			chai.request(server)
				.get('/authors')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					res.body.should.be.a('array')
					res.body.should.deep.include({id: 5, name : 'test', email : 'test@test.com', address : 'test', age : 34})
					done()
				})
		})		
		it('it should delete an author', (done) => {
			chai.request(server)
				.delete('/authors/7')
				.send()
				.end((err, res) => {
					res.should.have.status(202)
					should.exist(res.body)
					res.body.should.have.property('message').eql('accepted')
					done()
				})
		})
		it('result should not contain the deleted author', (done) => {
			chai.request(server)
				.get('/authors')
				.end((err, res) => {
					res.should.have.status(200)
					should.exist(res.body)
					console.warn(res.body)
					res.body.should.be.a('array')
					res.body.should.not.deep.include({id: 8, name : 'name 7', email : 'name7@nowhere.com', address : 'some address on 7th street', age : 37})
					done()
				})
		})		
	})
})

