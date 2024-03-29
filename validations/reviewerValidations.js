const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      fullName: Joi.string().min(3).max(80).required(),
      birthdate: Joi.date().iso().max(Date.now()).required(),
      email: Joi.string().email().required(),
      startDate: Joi.date().iso().max(Date.now()).required(),
      workingHours: Joi.number().min(3).integer(),
      salary: Joi.number(),
      password: Joi.string().min(8).required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      birthdate: Joi.date().iso().max(Date.now()),
      email: Joi.string().email(),
      startDate: Joi.date().iso().max(Date.now()),
      workingHours: Joi.number().min(5).integer(),
      salary: Joi.number(),
      password: Joi.string().min(8),
      acceptedByAdmin: Joi.boolean()
    }

    return Joi.validate(request, updateSchema)
  }
}
