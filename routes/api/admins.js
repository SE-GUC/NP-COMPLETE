// Load modules
const express = require('express')
const router = express.Router()

// Admin model
const Admin = require('../../models/Admin')

// Validator
const validator = require('../../validations/adminValidations')

//! async await needed?
// Read all Admins (Default route)
router.get('/', async (req, res) => {
  const admins = await Admin.find()
  res.json({ data: admins })
})

// Create a new Admin
router.post('/', async (req, res) => {
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
    //! ! Issue with using data vs. value as before

    //! Untested
    const newAdmin = await Admin.create(data)
    return res.json({
      status: 'Success',
      message: `New admin created with id ${newAdmin.id}`,
      data: newAdmin
    })
  } catch (err) {
    //! Error handling required
    console.log(err)
  }
})

// Reads a specific Admin given id in URL
router.get('/:id', async (req, res) => {
  const adminId = req.params.id
  const admin = await Admin.findOne({ _id: adminId })
  if (!admin) {
    return res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: await Admin.find()
    })
  }
  res.json({ data: admin })
})

// Update an existing Admin given id in URL
router.put('/:id', async (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const isValidated = validator.updateValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }
  } catch (err) {
    console.log(err)
  }
  const adminId = req.params.id
  const adminToUpdate = await Admin.findOne({ _id: adminId })

  if (!adminToUpdate) {
    return res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: await Admin.find()
    })
  }
  await Admin.updateOne(data)
  const updatedAdmin = await Admin.findOne({ _id: adminId })
  return res.json({
    status: 'Success',
    message: `Updated admin with id ${adminId}`,
    data: updatedAdmin
  })
})

// Delete a specific Admin given ID in URL
router.delete('/:id', async (req, res) => {
  //! Delete first, ask questions later
  try {
    const adminId = req.params.id
    const deletedAdmin = await Admin.findByIdAndRemove(adminId)

    if (!deletedAdmin) {
      return res.status(400).json({
        status: 'Error',
        message: 'Admin not found',
        availableAdmins: await Admin.find()
      })
    }

    res.json({
      status: 'Success',
      message: `Deleted admin with id ${adminId}`,
      deletedAdmin: deletedAdmin,
      remainingAdmins: await Admin.find()
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
