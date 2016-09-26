'use strict';

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat'
const port = process.env.PORT || 3000


//Middlewares

app.use(express.static('client'))
app.use(json())


//Gets
app.get('/api/title', (req, res) =>
	res.json({"title": 'MEAN Chat' })
)

const Message = mongoose.model('message', {
	author: String,
	content: String
})


app.get('/api/messages', (req, res, err) =>
	Message
	.find()
	.then(messages => res.json({messages}))
	.catch(err)
)

app.post('/api/messages', (req, res, err) => {
	const msg = req.body
	Message
		.create(msg)
		.then(msg => res.json(msg))
		.catch(err)
})

//Listen
mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
	app.listen(port, () => console.log(`Listening on port: ${port}`))
	)

