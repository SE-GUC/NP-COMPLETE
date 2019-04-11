// const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const tokenKey = require('../../config/keys').secretOrKey
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
    console.log(hashedPassword)
    // const hashedPasswordObject = { 'password': hashedPassword }
    const newData = {}
    Object.keys(data).forEach(key => {
      if (data[key] !== password) {
        newData[key] = data[key]
      } else {
        newData[key] = hashedPassword
      }
    })
    await Model.create(newData)
    res.json({ msg: 'User created successfully', data: newData })
  } catch (error) {
    res.status(422).send({ error: 'Can not create user' })
  }
}
exports.login = async (req, res, validator, Model) => {
  try {
    const { email, password } = req.body
    const user = await Model.findOne({ email })
    if (!user) return res.status(404).json({ email: 'Email does not exist' })
    const match = bcrypt.compareSync(password, user.password)
    if (match) {
      const payload = {
        id: user.id,
        name: user.fullName,
        email: user.email
      }
      const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' })
      return res.json({ token: `Bearer ${token}` })
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
