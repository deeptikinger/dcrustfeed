if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}


// module.exports={
//     JWT_KEY:"secretString",
//     MONGODB_URL:"mongodb+srv://deepti:Deepti123@cluster0.icfip.mongodb.net/DcrustFeed?retryWrites=true&w=majority"
// }