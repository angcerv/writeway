const { model, Schema } = require('mongoose')

const sheetSchema = new Schema({
    sheetName: String,
    projectId: String,
    templateId: String,
    features: [{attribute: String, value: String}]
})

module.exports = model('Sheet', sheetSchema)