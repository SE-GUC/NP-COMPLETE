// Load modules
const express = require('express')
const router = express.Router()

// Required models
const Admin = require('../../models/Admin')
const Company = require('../../models/Company')
const Task = require('../../models/Task')

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
//                                !-Shiko was here-!

// update the deadline of a specfic task given the task id and the new deadline in the body
router.put('/updateDeadline/:id', async (req, res) => {
  const data = req.body
  // check if the body is empty
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }
  try {
    const adminId = req.params.id
    const adminToUpdate = await Admin.findById(adminId)
    // check if there is no such admin
    if (!adminToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Admin not found',
        availableAdmins: await Admin.find()
      })
    }
    const taskID = req.body.TaskID
    const task = await Task.findById(taskID)
    // check if there exist such tasj
    if (!task) {
      return res.status(404).json({
        status: 'Error',
        error: 'Task does not exist'
      })
    }
    // update the deadline (if given in the body)
    const query = { '_id': taskID }
    const updatedTask = await Task.findOneAndUpdate(query, req.body)
    console.log(updatedTask)
    res.json({
      status: 'Success',
      message: `Updated Task with id ${taskID}`,
      data: updatedTask
    })
  } catch (err) {
    console.log(err)
  }
})
// Update an existing Admin given id in URL
router.put('/:id', async (req, res) => {
  var data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const adminId = req.params.id
    const adminToUpdate = await Admin.findById(adminId)

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
    data = updatedAdmin.body
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
// Publish established companies details
router.put('/establishCompany/:id', async (req, res) => {
  try {
    const id = req.params.id
    const currentCompany = await Company.findById(id)
    if (!currentCompany) { // check if the company exists
      return res.status(400).json({
        status: 'Error',
        message: 'Could not find the Company you are looking for'
      })
    }
    if (!(currentCompany.accepted === true)) { // check if the company is accepted
      return res.status(400).json({
        status: 'Error',
        message: 'The company is not accepted yet'
      })
    }
    if (currentCompany.form.paid === true) { // check if the investor had paid the fees
      const query = { '_id': id }
      const data = { 'state': 'published', 'establishmentDate': Date.now() }
      const updatedCompany = await Company.findByIdAndUpdate(query, data, { new: true })
      return res.json({
        status: 'Success',
        message: `Updated company successfully`,
        data: updatedCompany
      })
    } else {
      return res.status(400).json({
        status: 'Error',
        message: 'The investor did not pay the fees'
      })
    }
  } catch (error) {
    console.log('error')
  }
})

// View All cases (Companies) on the system
router.get('/viewCases/:id', async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await Admin.findOne({ _id: adminId })
    if (!admin) { // makes sure that the one accessing the data is an admin
      return res.status(400).json({
        status: 'Error',
        message: 'Admin access required',
        availableAdmins: await Admin.find()
      })
    } else {
      
      res.redirect(307, '/api/companies/') // redirect to companies get all route
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
