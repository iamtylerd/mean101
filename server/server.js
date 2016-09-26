'use strict';

const express = require('express')
const app = express()

const port = process.env.PORT || 3000


//Middlewares

app.use(express.static('client'))

//Gets
app.get('/api/title', (req, res) =>
	res.json({"title": 'MEAN 101 from Node' })
)

//List
app.listen(port, () => console.log(`Listening on port: ${port}`))
