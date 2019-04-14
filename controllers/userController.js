// const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys').secretOrKey
const userValidator = require('../validations/userValidations')
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
        email: 'Email already exists'
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newData = {}
    Object.keys(data).forEach(key => {
      if (data[key] !== password) {
        newData[key] = data[key]
      } else {
        newData[key] = hashedPassword
      }
    })
    const newUser = await Model.create(newData)
    res.json({
      status: 'Success',
      msg: `User created successfully`,
      data: newUser })
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
