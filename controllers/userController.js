// const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys').secretOrKey
const emailUserName = require('../config/keys').user
const emailPassword = require('../config/keys').pass
const baseUrl = require('../config/keys').baseUrl
const userValidator = require('../validations/userValidations')
const nodemailer = require('nodemailer')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Reviewer = require('../models/Reviewer')
const Investor = require('../models/Investor')
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailUserName,
    pass: emailPassword
  }
})

// send reset password mail
exports.forgetPassword = async (req, res) => {
  try {
    const myBody = req.body
    const isValidated = userValidator.forgetPasswordValidation(myBody)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const email = myBody.email
    const adminUser = await Admin.findOne({ email })
    const lawyerUser = await Lawyer.findOne({ email })
    const reviewerUser = await Reviewer.findOne({ email })
    const investorUser = await Investor.findOne({ email })
    if (!((adminUser) || (lawyerUser) || (reviewerUser) || (investorUser))) {
      return res.json({
        status: 'Error',
        message: 'You did not register on GAFI-WEB'
      })
    }
    var model = ''
    if (adminUser) {
      model = 'admins'
    } else
    if (lawyerUser) {
      model = 'lawyers'
    } else if (reviewerUser) {
      model = 'reviewers'
    } else {
      model = 'investors'
    }
    const emailToken = jwt.sign({ email: email }, tokenKey, { expiresIn: '1h' })
    const url = `${baseUrl}/resetPassword/${model}/${emailToken}`
    transporter.sendMail({
      to: email,
      subject: 'Reset your Password',
      message: 'Reset your password of GAFI',
      html: `Please click this link to reset your password: <a href="${url}">${url}</a>`
    })
    return res.json({
      status: 'Success',
      message: 'A reset email was sent to you, check your mail'
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
// reset password
exports.resetPassword = async (req, res, Model) => {
  try {
    const data = jwt.verify(req.params.token, tokenKey)
    const email = data.email
    const myBody = req.body
    const isValidated = userValidator.resetPasswordValidation(myBody)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const password = myBody.firstPassword
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = await Model.findOne({ email })
    await Model.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })
    return res.json({
      status: 'Success',
      message: 'Your password has been reset successfully'
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
// confrimation mail
exports.confirmation = async (req, res, Model) => {
  try {
    const data = jwt.verify(req.params.token, tokenKey)
    await Model.findByIdAndUpdate(data.id, { confirmed: true }, { new: true })
    return res.json({
      status: 'Success',
      message: 'your email is confirmed you can log in now'
    })
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
// register
exports.register = async (req, res, validator, Model) => {
  try {
    const data = req.body
    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const email = req.body.email
    const password = req.body.password
    const adminUser = await Admin.findOne({ email })
    const lawyerUser = await Lawyer.findOne({ email })
    const reviewerUser = await Reviewer.findOne({ email })
    const investorUser = await Investor.findOne({ email })
    if (adminUser || lawyerUser || reviewerUser || investorUser) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email already exists'
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newData = {
      ...data,
      password: hashedPassword
    }
    var model = ''
    switch (Model.collection.name) {
      case 'investor': model = 'investors'
        break
      case 'lawyer': model = 'lawyers'
        break
      case 'reviewer': model = 'reviewers'
        break
      case 'admin': model = 'admins'
    }
    const newUser = await Model.create(newData)
    const emailToken = jwt.sign({ id: newUser['id'] }, tokenKey, { expiresIn: '1h' })
    const url = `${baseUrl}/confirmation/${model}/${emailToken}`
    transporter.sendMail({
      to: data.email,
      subject: 'Confirmation email from GAFI',
      message: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
    })
    res.json({
      status: 'Success',
      msg: `User created successfully, Please confirm your mail`,
      data: newUser })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
// login
exports.login = async (req, res, Model, type) => {
  try {
    const data = req.body
    const isValidated = userValidator.loginValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const { email, password } = req.body
    const user = await Model.findOne({ email })
    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: 'You must sign up first'
      })
    }
    if (!user.confirmed) {
      return res.status(404).json({
        status: 'Error',
        message: 'You must confirm your mail first '
      })
    }
    const match = bcrypt.compareSync(password, user.password)
    if (match) {
      const payload = {
        id: user._id,
        name: user.fullName,
        email: user.email,
        type: type
      }
      const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' })
      return res.json({
        status: 'Success',
        token: `Bearer ${token}`,
        id: user._id,
        type: type
      })
    } else {
      return res.status(400).json({
        status: 'Error',
        message: 'Worng password'
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
