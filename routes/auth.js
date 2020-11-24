const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const { json } = require('express')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/keys')
const requireLogin = require('../middleware/is-auth')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

//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

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"

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
                    return user.save()
                })
                .then(user => {
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
router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-replay@dcrustm.org",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})


router.post('/new-password',(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
})


module.exports = router