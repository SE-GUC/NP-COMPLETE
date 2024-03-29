const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).max(90).required(),
      accepted: Joi.boolean(),
      establishmentDate: Joi.date().iso().max(Date.now()),
      type: Joi.string().required(),
      state: Joi.string().valid('Pending', 'Established'),
      investorId: Joi.string(),
      feedback: Joi.string(),
      form: Joi.object().keys({
        data: Joi.array(),
        comment: Joi.string().min(5),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean(),
        paid: Joi.boolean(),
        lawyerID: Joi.string(),
        reviewerID: Joi.string()
      }).required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3).max(90),
      accepted: Joi.boolean(),
      establishmentDate: Joi.date().iso().max(Date.now()),
      type: Joi.string(),
      state: Joi.string().valid('Pending', 'Established'),
      investorId: Joi.string(),
      feedback: Joi.string(),
      form: Joi.object().keys({
        data: Joi.array(),
        comment: Joi.string().min(5),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean(),
        paid: Joi.boolean(),
        lawyerID: Joi.string(),
        reviewerID: Joi.string()
      })
    }

    return Joi.validate(request, updateSchema)
  },
  editFormValidation: request => {
    const formDataSchema = {
      data: Joi.array()
    }

    return Joi.validate(request, formDataSchema)
  },
  reviewFormValidation: request => {
    const reviewSchema = {
      comment: Joi.string().min(5),
      acceptedByLawyer: Joi.number(),
      lawyerID: Joi.string()
    }

    return Joi.validate(request, reviewSchema)
  }
}
