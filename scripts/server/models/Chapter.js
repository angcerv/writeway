const { model, Schema } = require('mongoose')

const chapterSchema = new Schema({
    chapterName: String,
    projectId: String,
    content: String
})

module.exports = model('Chapter', chapterSchema)