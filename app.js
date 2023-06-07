//app.js
const express = require('express')
const app = express()

app.use(express.json())

// Using shared state is bad practice for tests, but it's just for the sake of the example
let posts = {},
	i = 0

// CRUD

// Create

app.post('/blog', (req, res) => {
	const title = req.body?.title
	if (!title) {
		res.status(400).send('Missing required fields: title')
	} else {
		posts[i] = title
		res.status(200).send({id: i})
		i++
	}
})

// Read

app.get('/blog', (req, res) => {
	const id = req.query?.id
	if (id && posts[id]) {
		res.status(200).send({title: posts[req.query.id]})
	} else if (id) {
		res.status(404).send('Not found')
	} else {
		res.status(400).send('Missing required fields: id')
	}
})

// Update
app.put('/blog', (req, res) => {
	const id = req.body?.id
	const title = req.body?.title
	if (typeof id === 'number' && typeof title === 'string') {
		posts[id] = title
		res.status(200).send({title: posts[id]})
	} else {
		res.status(400).send('Missing required fields: id, title')
	}
})

// Destroy

app.delete('/blog', (req, res) => {
	const id = req.body?.id
	if (typeof id === 'number') {
		delete posts[id]
		res.status(200).send({id})
	} else {
		res.status(400).send('Missing required fields: id')
	}
})

module.exports = app
