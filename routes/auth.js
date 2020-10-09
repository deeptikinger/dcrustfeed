const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const { json } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')
const requireLogin = require('../middleware/is-auth')



router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
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
                        password: hashPassword
                    })
                    return user.save()
                })
                .then(user => {
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
                        const {_id,name,email,followers,following}=user
                        return res.status(200).json({
                          token,
                          user:{
                            _id,name,email,followers,following
                          }
                        })
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router