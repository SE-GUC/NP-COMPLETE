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
    data: [],
    comment: String,
    acceptedByLawyer: Number,
    acceptedByReviewer: Number,
    filledByLawyer: Boolean,
    paid: Boolean,
    lawyerID: Schema.Types.ObjectId,
    reviewerID: Schema.Types.ObjectId
  }

})
module.exports = mongoose.model('company', companySchema)
