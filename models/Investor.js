// The investor model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const investorSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Investor', investorSchema, 'investor')
