const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan= require('morgan')
require('./models/user')

const {MONGODB_URL}=require('./keys')
mongoose.connect(MONGODB_URL,{useUnifiedTopology: true ,useNewUrlParser:true})

mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',()=>{
    console.log('error while connecting')
})
app.use(morgan('dev'))
app.use(express.json())
app.use('/user',require('./routes/auth'))

app.listen(5000,()=>{
    console.log("server is running")
})