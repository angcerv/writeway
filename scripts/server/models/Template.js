const { model, Schema } = require('mongoose')

const templateSchema = new Schema({
    templateName: String,
    projectId: String,
    attributes: [String]
})

module.exports = model('Template', templateSchema)