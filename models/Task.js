// Load mongoose Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const TaskSchema = new Schema({
  handler: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }

})

module.exports = mongoose.model('Task', TaskSchema)
