const mongoose = require('mongoose')

// Database Config, better to store in an env
const dbValues = 'mongodb://127.0.0.1:27017/main'

mongoose
	.connect(dbValues, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
	.then(() => console.log('MongoDB connection successful'))
	.catch(e => {
		console.error('Connection error', e.message)
	})
const db = mongoose.connection

module.exports = db
