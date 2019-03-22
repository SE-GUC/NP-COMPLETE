const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).max(90).required(),
      type: Joi.string().required(),
      establishmentDate: Joi.date().iso().max(Date.now()).required(),
      accepted: Joi.bool().required(),
      state: Joi.string().required(),
      investorId: Joi.string().required(),
      form: Joi.object().keys({
        data: Joi.array(),
        comment: Joi.string(),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean().required(),
        paid: Joi.boolean().required(),
        lawyerID: Joi.string(),
        reviewerID: Joi.string()
      }).required()
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
      investorId: Joi.string(),
      form: Joi.object().keys({
        data: Joi.array,
        comment: Joi.string.min(5).required(),
        acceptedByLawyer: Joi.number().min(-1).max(1).integer(),
        acceptedByReviewer: Joi.number().min(-1).max(1).integer(),
        filledByLawyer: Joi.boolean(),
        paid: Joi.boolean(),
        lawyerID: Joi.objectId(),
        reviewerID: Joi.objectId()
      })
    }

    return Joi.validate(request, updateSchema)
<<<<<<< HEAD
=======
  },
  editFormValidation: request => {
    const formDataSchema = {
      data: Joi.array()
    }

    return Joi.validate(request, formDataSchema)
>>>>>>> c5a00be2eded40fac4018ddb74425c3a2e3af2d9
  }
}
