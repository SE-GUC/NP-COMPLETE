const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      companyType: Joi.string().required(),
      fileds: Joi.array().required(),
      types: Joi.array().required(),
      validations: Joi.array().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {

    }

    return Joi.validate(request, updateSchema)
  }
}
