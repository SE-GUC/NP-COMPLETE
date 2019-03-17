const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string().min(3),
      email: Joi.string().email(),
      phone: Joi.number()
    }

    return Joi.validate(request, updateSchema)
  }

}
