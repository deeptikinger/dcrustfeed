const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const { json } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto= require('crypto')
const { JWT_KEY } = require('../config/keys')
const requireLogin = require('../middleware/is-auth')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

// 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


const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:"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"

    }
}))

router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "Please fill all details"
        })
    }
    User.findOne({ email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: "User already exists"
                })
            }
            bcrypt.hash(password, 10)
                .then(hashPassword => {
                    const user = new User({
                        email: email,
                        name: name,
                        password: hashPassword,
                        pic: pic
                    })
             user.save()
                .then(user => {
                    console.log(user.email)
                    transport.sendMail({
                        to: user.email,
                        from: "no-reply@dcrustm.org",
                        subject: "signup success",
                        html: "<h1>Welcome to dcrustfeed</h1>"
                    })
                    res.status(200).json({
                        message: "user created"
                    })
                })
            })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({
            message: "Please fill all details"
        })
    }

    User.findOne({ email: email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Email or Password "
                })
            }
            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    if (!doMatch) {
                        return res.status(404).json({
                            message: "Invalid Email or Password"
                        })
                    } else {
                        const token = jwt.sign({
                            _id: user._id
                        },
                            JWT_KEY
                        )
                        const { _id, name, email, followers, following, pic } = user
                        return res.status(200).json({
                            token,
                            user: {
                                _id, name, email, followers, following, pic
                            }
                        })
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/reset-password",(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token=buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then((user)=>{
          if(!user){
              return res.status(422).json({message:"user don't exist"})
          }
          user.resetToken = token
          user.expireToken =Date.now() + 3600000
          user.save()
          .then(res=>{
            transport.sendMail({
                to:user.email,
                from :"noreply@dcrustm.org",
                subject:"password-reset",
                html :`
                <p>You are requested to reset the password </p>
                <h5> click on this <a href:"http://localhost:6000/auth/reset-password/${token}">link</a> to reset password</h5>
                `
            })
            res.json({message:"check your email"})
          })
      })
  })
})

router.post('/new-password',(req,res)=>{
    const newPassword=req.body.password
    const token = req.body.token
    User.findOne({resetToken:token,expireToken:{$gt:Date.now()}})
    .then((user)=>{
        if(!user){
           return res.status(422).json({message:"session expired"}) 
        }
        bcrypt.hash(newPassword,10)
        .then((hash)=>{
            user.password = hash
            user.resetToken = undefined
            user.expireToken = undefined
         return user.save()     
        })
        .then((user)=>{
            res.json({message:"password updated"})
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router