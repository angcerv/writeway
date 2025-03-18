const { model, Schema } = require('mongoose')

const projectSchema = new Schema({
    userId: String,
    projectName: String,
    lastModified: String,
    shareUsers: [{ userId: String }],
    tasks: [{text: String, done: Boolean, assigned: String}]
})

module.exports = model('Project', projectSchema)