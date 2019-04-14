// The admin model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Admin', AdminSchema, 'admin')
