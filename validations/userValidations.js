const Joi = require('joi')

module.exports = {
  loginValidation: request => {
    const loginSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
    return Joi.validate(request, loginSchema)
  },
  updatePasswordValidation: request => {
    const updatePasswordValidationSchema = {
      currentPassword: Joi.string().required(),
      firstPassword: Joi.string().required(),
      secondPassword: Joi.string().required()
    }
    return Joi.validate(request, updatePasswordValidationSchema)
  },
  updateEmailValidation: request => {
    const updateEmailValidationSchema = {
      currentPassword: Joi.string().required(),
      email: Joi.string().email().required()
    }
    return Joi.validate(request, updateEmailValidationSchema)
  }
}
