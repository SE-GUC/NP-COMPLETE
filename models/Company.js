// The Company model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  establishmentDate: {
    type: Date
  },
  type: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  accepted: {
    type: Boolean
  },
  investorId: {
    type: String
  },
  form: {
    data: [],
    comment: String,
    acceptedByLawyer: Number,
    acceptedByReviewer: Number,
    filledByLawyer: Boolean,
    paid: Boolean,
    lawyerID: String,
    reviewerID: String
  },
  fees: {
    type: Number
  }

})
module.exports = mongoose.model('company', companySchema)
