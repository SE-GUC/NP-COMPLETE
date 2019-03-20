// The Company model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  establishmentDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }

})
module.exports = mongoose.model('company', companySchema)
