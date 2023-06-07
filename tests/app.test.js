const request = require('supertest')
const app = require('../app')

describe('Create blog', () => {
	it('should response the POST method with status 400', async () => {
		const response = await request(app)
			.post('/blog')
			.send({name: 'john'})
			.set('Accept', 'application/json')
		expect(response.text).toBe('Missing required fields: title')
		expect(response.statusCode).toBe(400)
	})

	it('should response the POST method with status 200', async () => {
		const resOne = await request(app)
			.post('/blog')
			.send({title: 'blog title'})
			.set('Accept', 'application/json')
		expect(resOne.statusCode).toBe(200)
		expect(resOne.body).toEqual({id: 0})
		const resTwo = await request(app)
			.post('/blog')
			.send({title: 'blog title'})
			.set('Accept', 'application/json')
		expect(resTwo.statusCode).toBe(200)
		expect(resTwo.body).toEqual({id: 1})
	})
})

describe('Read blog', () => {
	it('should return title of blog when given correct id', async () => {
		const response = await request(app).get('/blog').query({id: 0})
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({title: 'blog title'})
	})
	it('should return 404 when given incorrect id', async () => {
		const response = await request(app).get('/blog').query({id: 2})
		expect(response.statusCode).toBe(404)
		expect(response.text).toBe('Not found')
	})
	it('should return 400 if id is missing', async () => {
		const response = await request(app).get('/blog')
		expect(response.statusCode).toBe(400)
		expect(response.text).toBe('Missing required fields: id')
	})
})

describe('Update blog', () => {
	it('should return updated blog', async () => {
		const response = await request(app)
			.put('/blog')
			.send({id: 0, title: 'new title'})
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({title: 'new title'})
	})
	it('should return 400 if id or title is missing', async () => {
		const response = await request(app)
			.put('/blog')
			.send({_id: 0, title: 'new title'})
		expect(response.statusCode).toBe(400)
		expect(response.text).toBe('Missing required fields: id, title')
	})
})

describe('Delete blog', () => {
	it('should delete blog when given id', async () => {
		const id = 0
		const res = await request(app).delete('/blog').send({id})
		expect(res.statusCode).toBe(200)
		expect(res.body).toEqual({id})
	})
	it('should return 400 if id is missing', async () => {
		const res = await request(app).delete('/blog')
		expect(res.statusCode).toBe(400)
		expect(res.text).toBe('Missing required fields: id')
	})
})
