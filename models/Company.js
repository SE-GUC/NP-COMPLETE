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
  },
  accepted: {
    type: Boolean,
    required: true
  },
  form: {
    data: Object,
    comment: String,
    acceptedByLawyer: Number,
    acceptedByReviewer: Number,
    filledByLawyer: Boolean,
    paid: Boolean,
    lawyerID: { type: Schema.Types.ObjectId, ref: 'Lawyer' },
    reviewerID: { type: Schema.Types.ObjectId, ref: 'Reviewer' }
  }

})
module.exports = mongoose.model('company', companySchema)
