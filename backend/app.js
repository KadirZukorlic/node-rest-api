require('dotenv').config()
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const express = require('express')
const bodyPaser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

const feedRoutes = require('./routes/feed')

const app = express()

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '-' + file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

// app.use(bodyPaser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyPaser.json()) // application/json
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)
app.use('/images', express.static(path.join(__dirname, 'images')))

// CORS error handling
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*') // * for all
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use('/feed', feedRoutes)

app.use((error, req, res, next) => {
	console.log(error)
	const status = error.statusCode || 500
	const message = error.message
	const data = error.data
	res.status(status).json({ message: message, data: data })
})

mongoose
	.connect(process.env.MONGODB_CONNECT_URI)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(8080)
	})
	.catch((err) => console.log(err))
