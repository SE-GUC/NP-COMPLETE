const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().min(3).max(90).required(),
      establishmentDate: Joi.date().iso().max(Date.now()).required(),
      type: Joi.string().required(),
      state: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
        name: Joi.string().min(3).max(90),
        establishmentDate: Joi.date().iso().max(Date.now()),
        type: Joi.string(),
        state: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}