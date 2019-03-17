const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      handler: Joi.string().required(),
      creationDate: Joi.date().required().iso(),
      deadline: Joi.date().required().iso()
    }

    return Joi.validate(request, createSchema)
  },

  updatevalidation: request => {
    const updateSchema = {
      handler: Joi.string(),
      creationDate: Joi.date().iso(),
      deadline: Joi.date().iso()
    }

    return Joi.validate(request, updateSchema)
  }
}
