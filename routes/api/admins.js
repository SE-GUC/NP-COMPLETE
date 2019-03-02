// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Admin model
const Admin = require('../../models/Admin')

// Temporary data created (acts as a mock database)
const admins = [
  new Admin('Lujine Elfeky', 'lujine@gmail.com', '1998-01-22', '2019-01-01', 6, 100),
  new Admin('Mohamed Hosam', 'hosam@gmail.com', '1998-06-05', '2018-05-03', 10, 150)
]

// Read all Admins (Default route)
router.get('/', (req, res) => res.json({ data: admins }))

// Create a new Admin
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80).required(),
    birthdate: Joi.date().iso().max(Date.now()).required(),
    email: Joi.string().email().required(),
    startDate: Joi.date().iso().max(Date.now()).required(),
    workingHours: Joi.number().min(5),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newAdmin = new Admin(
      value.fullName,
      value.birthdate,
      value.email,
      value.startDate,
      value.workingHours,
      value.salary
    )
    admins.push(newAdmin)
    return res.json({
      status: 'Success',
      message: `New admin created with id ${newAdmin.id}`,
      data: newAdmin
    })
  })
})

// Reads a specific Admin given id in URL
router.get('/:id', (req, res) => {
  const adminId = req.params.id
  const admin = admins.find(admin => admin.id === adminId)
  if (admin) {
    res.json({ data: admin })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: admins
    })
  }
})

// Update an existing Admin given id in URL
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80),
    birthdate: Joi.date().iso().max(Date.now()),
    email: Joi.string().email(),
    startDate: Joi.date().iso().max(Date.now()),
    workingHours: Joi.number().min(5),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const adminId = req.params.id
    const adminToUpdate = admins.find(admin => admin.id === adminId)

    if (!adminToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Admin not found'
      })
    }

    let x = 0
    Object.keys(value).forEach(key => {
      if (value[key]) {
        adminToUpdate[key] = value[key]
        x++
      }
    })
    if (x === 0) {
      return res.status(400).send({
        status: 'Error',
        message: 'Wrong data was sent',
        data: data
      })
    }

    return res.json({
      status: 'Success',
      message: `Updated admin with id ${adminId}`,
      data: adminToUpdate
    })
  })
})

// Delete a specific Admin given ID in URL
router.delete('/:id', (req, res) => {
  const adminId = req.params.id
  const admin = admins.find(admins => admins.id === adminId)
  if (admin) {
    const index = admins.indexOf(admin)
    admins.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted admin with id ${adminId}`,
      remainingCompanies: admins
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: admins
    })
  }
})

module.exports = router
