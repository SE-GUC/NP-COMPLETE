// Load modules
const express = require('express')
const router = express.Router()

// Admin model
const Admin = require('../../models/Admin')

// Company model
const Company = require('../../models/Company')

// Validator
const validator = require('../../validations/adminValidations')

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
    const adminId = req.params.id
    const adminToUpdate = await Admin.findOne({ _id: adminId })

    if (!adminToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Admin not found',
        availableAdmins: await Admin.find()
      })
    }

    const isValidated = validator.updateValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }

    const query = { '_id': adminId }
    const updatedAdmin = await Admin.findByIdAndUpdate(query, data)
    return res.json({
      status: 'Success',
      message: `Updated admin with id ${adminId}`,
      data: updatedAdmin
    })
  } catch (err) {
    console.log(err)
  }
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

router.get('/casesPage/:id', async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await Admin.findOne({ _id: adminId })
    if (!admin) { // makes sure that the one accessing the data is an admin
      return res.status(400).json({
        status: 'Error',
        message: 'Admin access required'
      })
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
