// The CompanyType model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companyTypeSchema = new Schema({
  companyType: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
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
  },
  descriptions: {
    type: [String],
    required: true
  }
})
module.exports = mongoose.model('CompanyType', companyTypeSchema, 'companyType')
