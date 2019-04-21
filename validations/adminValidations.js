const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      fullName: Joi.string().min(3).max(80).required(),
      birthdate: Joi.date().iso().max(Date.now()).required(),
      email: Joi.string().email().required(),
      startDate: Joi.date().iso().max(Date.now()).required(),
      workingHours: Joi.number().min(5),
      salary: Joi.number(),
      password: Joi.string().min(8).required()
    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      birthdate: Joi.date().iso().max(Date.now()),
      email: Joi.string().email(),
      startDate: Joi.date().iso().max(Date.now()),
      workingHours: Joi.number().min(5),
      salary: Joi.number(),
      password: Joi.string().min(8)
    }
    return Joi.validate(req, updateSchema)
  },
  sendAnnouncement: req => {
    const sendAnnouncementSchema = {
      message: Joi.string().min(2).required(),
      recipients: Joi.string().valid(['Investors', 'Lawyers', 'Reviewers', 'Everyone', '']).required()
    }
    return Joi.validate(req, sendAnnouncementSchema)
  }

}
