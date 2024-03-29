// The external entity model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExternalEntitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  feesPercentage: {
    type: Number,
    required: true
  },
  feesMin: {
    type: Number,
    required: true
  },
  feesMax: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ExternalEntity', ExternalEntitySchema, 'externalEntity')
