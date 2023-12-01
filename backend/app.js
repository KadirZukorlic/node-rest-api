const express = require('express')
const bodyPaser = require('body-parser')

const feedRoutes = require('./routes/feed')

const app = express()

// app.use(bodyPaser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyPaser.json()) // application/json

// CORS error handling
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*') // * for all
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use('/feed', feedRoutes)

app.listen(8080)
