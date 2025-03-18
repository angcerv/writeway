const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,
    authorname: String
})

module.exports = model('User', userSchema)