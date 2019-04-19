// const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys').secretOrKey
const userValidator = require('../validations/userValidations')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Reviewer = require('../models/Reviewer')
const Investor = require('../models/Investor')
const passwordRegx = /(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

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
    const user = await Model.findOne({ email })
    if (user) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email already exists'
      })
    }
    if (passwordRegx.test(password)) {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(data.password, salt)
      data.password = hashedPassword
      const newUser = await Model.create(data)
      res.json({
        status: 'Success',
        message: `User created successfully`,
        data: newUser })
    } else {
      const errors = vaildatePassword(password)
      return res.status(400).json({
        status: 'Error',
        message: errors[0]
      })
    }
  } catch (error) {
    res.status(422).send({ error: 'Can not create user' })
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
    const match = bcrypt.compareSync(password, user.password)
    if (match) {
      const payload = {
        id: user._id,
        name: user.fullName,
        email: user.email
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
exports.updatePassword = async (req, res) => {
  try {
    const isValidated = userValidator.updatePasswordValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const { currentPassword } = req.body
    const { firstPassword } = req.body
    const { secondPassword } = req.body
    const { id } = req.params
    const adminUser = await Admin.findById(id)
    const lawyerUser = await Lawyer.findById(id)
    const reviewerUser = await Reviewer.findById(id)
    const investorUser = await Investor.findById(id)
    if (adminUser) {
      const password = adminUser.password
      checkForUpdatePassword(res, Admin, firstPassword, currentPassword, secondPassword, password, id)
      return
    } else if (lawyerUser) {
      const password = lawyerUser.password
      checkForUpdatePassword(res, Lawyer, firstPassword, currentPassword, secondPassword, password, id)
      return
    } else if (investorUser) {
      const password = investorUser.password
      checkForUpdatePassword(res, Investor, firstPassword, currentPassword, secondPassword, password, id)
      return
    } else {
      const password = reviewerUser.password
      checkForUpdatePassword(res, Investor, firstPassword, currentPassword, secondPassword, password, id)
      return
    }
  } catch (error) {
    return res.json({
      status: 'Error',
      message: error.message
    })
  }
}
exports.updateEmail = async (req, res) => {
  try {
    const isValidated = userValidator.updateEmailValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message })
    }
    const { currentPassword } = req.body
    const { email } = req.body
    const adminEmail = await Admin.findOne({ email })
    const lawyerEmail = await Lawyer.findOne({ email })
    const reviewerEmail = await Reviewer.findOne({ email })
    const investorEmail = await Investor.findOne({ email })
    if (adminEmail || lawyerEmail || reviewerEmail || investorEmail) {
      return res.status(400).json({
        status: 'Error',
        message: 'This email is already in use' })
    }
    const { id } = req.params
    const adminUser = await Admin.findById(id)
    const lawyerUser = await Lawyer.findById(id)
    const reviewerUser = await Reviewer.findById(id)
    const investorUser = await Investor.findById(id)
    if (adminUser) {
      const password = adminUser.password
      checkForUpdateEmail(res, Admin, currentPassword, password, id, email)
      return
    } else if (lawyerUser) {
      const password = lawyerUser.password
      checkForUpdateEmail(res, Lawyer, currentPassword, password, id, email)
      return
    } else if (investorUser) {
      const password = investorUser.password
      checkForUpdateEmail(res, Investor, currentPassword, password, id, email)
      return
    } else {
      const password = reviewerUser.password
      checkForUpdateEmail(res, Investor, currentPassword, password, id,email)
      return
    }
  } catch (error) {
    return res.json({
      status: 'Error',
      message: error.message
    })
  }
}

// helper
const vaildatePassword = password => {
  var errors = []
  if (password.length < 8) {
    errors.push('Your password must be at least 8 characters')
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one small letter')
  }
  if (password.search(/[A-Z]/) < 0) {
    errors.push('Your password must contain at least one capital letter')
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.')
  }
  if (password.search(/[!@#$%^&*_]/) < 0) {
    errors.push('Your password must contain at least one special character like * ! ^ !')
  }
  return errors
}
const checkForUpdatePassword = async (res, Model, firstPassword, currentPassword, secondPassword, password, id) => {
  if (!bcrypt.compareSync(currentPassword, password)) {
    return res.json({
      status: 'Error',
      message: `Wrong password`
    })
  }
  if (firstPassword !== secondPassword) {
    return res.json({
      status: 'Error',
      message: `Passwords don't match`
    })
  }
  if (!passwordRegx.test(firstPassword)) {
    const errors = vaildatePassword(firstPassword)
    return res.status(400).json({
      status: 'Error',
      message: errors[0]
    })
  }
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(firstPassword, salt)
    const newUser = await Model.findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
    return res.json({
      status: 'Success',
      message: `your password was updated successfully`,
      data: newUser })
  } catch (error) {
    return res.json({
      status: 'Error',
      message: error.message
    })
  }
}
const checkForUpdateEmail = async (res, Model, currentPassword, password, id, email) => {
  if (!bcrypt.compareSync(currentPassword, password)) {
    return res.json({
      status: 'Error',
      message: `Wrong password`
    })
  }
  try {
    const newUser = await Model.findByIdAndUpdate(id, { email }, { new: true })
    return res.json({
      status: 'Success',
      message: `your email was updated successfully`,
      data: newUser })
  } catch (error) {
    return res.json({
      status: 'Error',
      message: error.message
    })
  }
}
