// do the create and update
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Admin model
const Admin = require('../../models/Admin')

// temporary data (to act as a mock database)
const admins = [
  new Admin('Lujine Elfeky', 'lujine@gmail.com', '1998-01-22', '2019-01-01', 6, 100),
  new Admin('Mohamed Hosam', 'hosam@gmail.com', '1998-06-05', '2018-05-03', 10, 150)
]

// Read all Admins
router.get('/', (req, res) => res.json({ data: admins }))

// Read specific admin
router.get('/:id', (req, res) => {
  const adminId = req.params.id
  const admin = admins.find(admins => admins.id === adminId)
  res.send(admin)
})

// create an admin
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    birthDate: Joi.date().required().iso(),
    startDate: Joi.date().iso().required(),
    workingHours: Joi.number().min(5),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }

    const newAdmin = new Admin(
      value.fullName,
      value.email,
      value.birthDate,
      value.startDate,
      value.workingHours,
      value.salary
    )
    admins.push(newAdmin)
    return res.json({
      status: 'success',
      message: `New Admin created with id ${newAdmin.id}`,
      data: newAdmin
    })
  })
})

// update an admin
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No data to update'
    })
  }

  const schema = Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string().email(),
    birthDate: Joi.date().iso(),
    startDate: Joi.date().iso(),
    workingHours: Joi.number().min(5),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }

    const id = req.params.id
    const adminToUpdate = admins.find(admin => admin.id === id)

    if (!adminToUpdate) {
      return res.status(400).json({
        status: 'error',
        message: 'Error admin not found'
      })
    }
    if (value.hasOwnProperty('fullName')) {
      adminToUpdate.fullName = value.fullName
    }
    if (value.hasOwnProperty('email')) {
      adminToUpdate.email = value.email
    }
    if (value.hasOwnProperty('birthDate')) {
      adminToUpdate.birthDate = value.birthDate
    }
    if (value.hasOwnProperty('startDate')) {
      adminToUpdate.startDate = value.startDate
    }
    if (value.hasOwnProperty('workingHours')) {
      adminToUpdate.workingHours = value.workingHours
    }
    if (value.hasOwnProperty('salary')) {
      adminToUpdate.salary = value.salary
    }

    return res.json({
      status: 'success',
      message: `Updated admin with id ${id}`,
      data: adminToUpdate
    })
  })
})

// Delete an Admin
router.delete('/:id', (req, res) => {
  const adminId = req.params.id
  const admin = admins.find(admins => admins.id === adminId)
  const index = admins.indexOf(admin)
  admins.splice(index, 1)
  res.send(admins)
})

module.exports = router
