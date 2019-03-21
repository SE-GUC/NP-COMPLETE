// Load mongoose Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ReviewerSchema = new Schema({
  fullName: {
    type: String,
    minlength: 3,
    maxlength: 80,
    required: true
  },
  birthdate: {
    type: Date,
    max: Date.now(),
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    max: Date.now(),
    required: true
  },
  workingHours: {
    type: Number,
    min: 3
  },
  salary: {
    type: Number
  }

})

module.exports = mongoose.model('Reviewer', ReviewerSchema)
