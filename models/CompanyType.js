// The Company Type model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companyTypeSchema = new Schema({
  companyType: {
    type: String,
    required: true
  },
  fields: {
    type: [String],
    required: true
  },
  types: {
    type: [String],
    required: true
  },
  validations: {
    type: [String],
    required: true
  }
})
module.exports = mongoose.model('companyType', companyTypeSchema)
