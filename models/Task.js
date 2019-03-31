// The Task Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  department: {
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
  },
  assigned: {
    type: Boolean,
    required: false
  },
  done: {
    type: Boolean,
    required: false
  },
  handler: {
    type: [],
    required: false
  }

})

module.exports = mongoose.model('Task', TaskSchema)
