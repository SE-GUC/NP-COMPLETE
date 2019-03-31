// The lawyer Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LawyerSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  workingHours: {
    type: Number
  },
  salary: {
    type: Number
  }
})

module.exports = mongoose.model('lawyers', LawyerSchema)
