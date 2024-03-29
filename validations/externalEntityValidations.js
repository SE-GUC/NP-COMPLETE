const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
      feesPercentage: Joi.number().required(),
      feesMin: Joi.number().required(),
      feesMax: Joi.number().required(),
      url: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3),
      email: Joi.string().email(),
      phone: Joi.number(),
      feesPercentage: Joi.number(),
      feesMin: Joi.number(),
      feesMax: Joi.number(),
      url: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }

}
