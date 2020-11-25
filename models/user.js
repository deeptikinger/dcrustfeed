const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    resetToken:String,
    expireToken:Date,
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dwf4l1tyy/image/upload/v1602306589/Sketchpad_aggxsz.png"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
})

module.exports = mongoose.model("User", userSchema)