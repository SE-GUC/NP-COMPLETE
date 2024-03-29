const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      fullName: Joi.string().min(3).max(90).required(),
      birthdate: Joi.date().iso().max(Date.now()).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmed: Joi.boolean()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(90),
      birthdate: Joi.date().iso().max(Date.now()),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      confirmed: Joi.boolean()
    }

    return Joi.validate(request, updateSchema)
  }
}
