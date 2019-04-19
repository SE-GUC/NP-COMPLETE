// const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys').secretOrKey
const userValidator = require('../validations/userValidations')
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
        msg: `User created successfully`,
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
      console.log('koko wawa')
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
exports.updatePassword = async (req, res, Model) => {
    const { currentPassword }= req.body
    const {firstPassword} = req.body
    const {secondPassword} = req.body
    const id = req.params.id
    const user = 
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
