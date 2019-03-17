// Load modules
const express = require('express')
const router = express.Router()

// Admin model
const Admin = require('../../models/Admin')

// Validator
const validator = require('../../validations/adminValidations')

// Temporary data created (acts as a mock database)
const admins = [
  new Admin('Lujine Elfeky', '1998-01-22', 'lujine@gmail.com', '2019-01-01', 6, 100),
  new Admin('Mohamed Hosam', '1998-06-05', 'hosam@gmail.com', '2018-05-03', 10, 150)
]

// Read all Admins (Default route)
router.get('/', (req, res) => res.json({ data: admins }))

// Create a new Admin
router.post('/', (req, res) => {
  const data = req.body

  //! Removed Joi.validate(data, schema, (err, value)

  try {
    //! Are try-catch blocks needed? Do we need it to cover all?
    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }
    //! Issue with using data vs. value as before
    const newAdmin = new Admin(
      data.fullName,
      data.birthdate,
      data.email,
      data.startDate,
      data.workingHours,
      data.salary
    )
    admins.push(newAdmin)
    return res.json({
      status: 'Success',
      message: `New admin created with id ${newAdmin.id}`,
      data: newAdmin
    })
  } catch (error) {
    //! Error handling required
    console.log(error)
  }
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

  try {
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }
  } catch (error) {
    console.log(error)
  }
  const adminId = req.params.id
  const adminToUpdate = admins.find(admin => admin.id === adminId)

  if (!adminToUpdate) {
    return res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: admins
    })
  }

  Object.keys(data).forEach(key => {
    if (data[key]) {
      adminToUpdate[key] = data[key]
    }
  })

  return res.json({
    status: 'Success',
    message: `Updated admin with id ${adminId}`,
    data: adminToUpdate
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
      remainingAdmins: admins
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
