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
  }
})
module.exports = mongoose.model('investors', investorSchema)