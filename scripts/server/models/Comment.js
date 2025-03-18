const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
    commentAuthor: String,
    commentMessage: String,
    projectId: String,
    date: String
})

module.exports = model('Comment', commentSchema)