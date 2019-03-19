// The admin model
// Load mongoose Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//! ID removed
//! Adding custom validators
//! Adding defaults
const AdminSchema = new Schema({
  fullName: {
    type: String,
    minlength: 3,
    maxlength: 80,
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
    type: Number,
    min: 5
  },
  salary: {
    type: Number
  }
})

module.exports = mongoose.model('Admin', AdminSchema)
