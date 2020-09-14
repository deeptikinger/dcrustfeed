const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true

    },
    photo: {
        type: String,
<<<<<<< HEAD
        required:true
=======
        required: true
>>>>>>> 20da01a17537d5356f1d951c4e99e6cd099f195b
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Post", postSchema);