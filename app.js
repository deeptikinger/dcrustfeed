const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 6000
const { MONGODB_URL } = require('./config/keys')
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
app.use('/client', require('./routes/user'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running", PORT)
})