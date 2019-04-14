const Joi = require('joi')

module.exports = {
  loginValidation: request => {
    const loginSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
    return Joi.validate(request, loginSchema)
  }
}
