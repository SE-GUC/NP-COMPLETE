const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      companyType: Joi.string().required(),
      fields: Joi.array().required(),
      types: Joi.array().required(),
      validations: Joi.array().required(),
      descriptions: Joi.array().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      companyType: Joi.string(),
      fields: Joi.array(),
      types: Joi.array(),
      validations: Joi.array(),
      descriptions: Joi.array().required()
    }

    return Joi.validate(request, updateSchema)
  }
}
