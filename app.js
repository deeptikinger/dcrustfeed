const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGODB_URL } = require('./keys')
const morgan = require('morgan')

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('connected', () => {
    console.log('connected')
})
mongoose.connection.on('error', (err) => {
    console.log('error while connecting', err)
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')
        return res.status(200).json({})
    }
    next()
})
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(morgan('dev'))
app.use('/user', require('./routes/auth'))
app.use('/post', require('./routes/post'))
app.use('/client', require('./routes/client'))
app.listen(5000, () => {
    console.log("server is running")
})