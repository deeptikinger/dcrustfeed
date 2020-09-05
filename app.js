<<<<<<< HEAD
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan= require('morgan')
require('./models/user')
=======
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGODB_URL } = require('./keys')
>>>>>>> upstream/staging

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('connected', () => {
    console.log('connected')
})
mongoose.connection.on('error', (err) => {
    console.log('error while connecting', err)
})
<<<<<<< HEAD
app.use(morgan('dev'))
app.use(express.json())
app.use('/user',require('./routes/auth'))
=======
>>>>>>> upstream/staging

require('./models/user')
require('./models/post')

app.use(express.json())
app.use('/user', require('./routes/auth'))
app.use('/post', require('./routes/post'))
app.listen(5000, () => {
    console.log("server is running")
})