const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).max(90).required(),
      type: Joi.string().required(),
      establishmentDate: Joi.date().iso().max(Date.now()).required(),
      accepted: Joi.bool().required(),
      state: Joi.string().required(),
      form: Joi.required().object.keys({
        data: Joi.object,
        comment: Joi.string.min(10),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean().required(),
        paid: Joi.boolean().required(),
        lawyerID: Joi.object,
        reviewerID: Joi.object
      })
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3).max(90),
      accepted: Joi.bool(),
      establishmentDate: Joi.date().iso().max(Date.now()),
      type: Joi.string(),
      state: Joi.string(),
      form: Joi.object.keys({
        data: Joi.object,
        comment: Joi.string.min(10).required(),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean().required(),
        paid: Joi.boolean().required(),
        lawyerID: Joi.object,
        reviewerID: Joi.object
      })
    }

    return Joi.validate(request, updateSchema)
  }
}
