const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      companyType: Joi.string().valid('SSC', 'SPC').required(),
      fields: Joi.array().required(),
      types: Joi.array().required(),
      validations: Joi.array().required(),
      descriptions: Joi.array().required(),
      url: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      companyType: Joi.string().valid('SSC', 'SPC'),
      fields: Joi.array(),
      types: Joi.array(),
      validations: Joi.array(),
      descriptions: Joi.array(),
      url: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
