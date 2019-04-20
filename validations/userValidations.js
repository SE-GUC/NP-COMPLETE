const Joi = require('joi')

module.exports = {
  loginValidation: request => {
    const loginSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
    return Joi.validate(request, loginSchema)
  },
  forgetPasswordValidation: request => {
    const forgetPaswordSchema = {
      email: Joi.string().email().required()
    }
    return Joi.validate(request, forgetPaswordSchema)
  },
  resetPasswordValidation: request => {
    const resetPaswordSchema = {
      firstPassword: Joi.string().min(8).required(),
      secondPassword: Joi.string().min(8).valid(Joi.ref('firstPassword')).required()
    }
    return Joi.validate(request, resetPaswordSchema)
  }
}
