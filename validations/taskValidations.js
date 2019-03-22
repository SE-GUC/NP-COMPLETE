const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      department: Joi.string().valid('Lawyer', 'Reviewer', 'Admin', 'External Entity').required(),
      creationDate: Joi.date().required().iso(),
      deadline: Joi.date().iso().required(),
      assigned: Joi.boolean(),
      done: Joi.boolean(),
      handler: Joi.array()
    }
    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      department: Joi.string().valid('Lawyer', 'Reviewer', 'Admin', 'External Entity'),
      creationDate: Joi.date().iso(),
      deadline: Joi.date().iso(),
      assigned: Joi.boolean(),
      done: Joi.boolean(),
      handler: Joi.array()
    }

    return Joi.validate(request, updateSchema)
  }
}
