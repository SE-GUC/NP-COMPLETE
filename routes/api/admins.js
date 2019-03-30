// Load modules
const express = require('express')
const router = express.Router()

// Required models
const Admin = require('../../models/Admin')
const Task = require('../../models/Task')
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

  try {
    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }

    const newAdmin = await Admin.create(data)
    return res.json({
      status: 'Success',
      message: `New admin created with id ${newAdmin.id}`,
      data: newAdmin
    })
  } catch (error) {
    console.log(error)
  }
})

// Reads a specific Admin given id in URL
router.get('/:id', async (req, res) => {
  const adminId = req.params.id
  const admin = await Admin.findById(adminId)
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
    const updatedAdmin = await Admin.findByIdAndUpdate(query, data, { new: true })
    data = updatedAdmin.body
    return res.json({
      status: 'Success',
      message: `Updated admin with id ${adminId}`,
      data: updatedAdmin
    })
  } catch (error) {
    console.log(error)
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
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', async (req, res) => {
  const adminId = req.params.id
  const userAdmin = await Admin.findById(adminId)
  if (!userAdmin) {
    return res.status(400).json({
      status: 'Error',
      message: 'Admin not found',
      availableAdmins: await Admin.find()
    })
  }
  const query = { 'department': 'Admin' }
  const task = await Task.find(query)
  // check if there exist such task
  if (!task) {
    return res.status(404).json({
      status: 'Error',
      message: 'There are no tasks for your department'
    })
  }
  // view the tasks of the given depratment
  res.json({
    status: 'Success',
    data: task
  })
})

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
    const updatedTask = await Task.findOneAndUpdate(query, req.body, { new: true })
    res.json({
      status: 'Success',
      message: `Updated Task with id ${taskID}`,
      data: updatedTask
    })
  } catch (err) {
    console.log(err)
  }
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await Admin.findById(adminId)
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

// As an admin I should be able to publish established companies details on portal, so that their details are available online.
router.put('/publishCompany/:id', async (req, res) => {
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
      const date = new Date(Date.now())
      date.setMilliseconds(0)
      date.setSeconds(0)
      date.setMinutes(0)
      const data = { 'state': 'published', 'establishmentDate': date }
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
    console.log(error)
  }
})

// View All cases (Companies) on the system
router.get('/viewCases/:id', async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await Admin.findById(adminId)
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

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await Admin.findOne({ _id: adminId })
    if (!admin) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only Internal Users have access to this page',
        availableReviewers: await Admin.find()
      })
    }
    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned) { // no tasks
      return res.json({
        message: 'No tasks available'
      })
    }
    var tasks = ''
    for (var i = 0; i < tasksAssigned.length; i++) {
      for (var j = 0; j < tasksAssigned[i].handler.length; j++) {
        if (tasksAssigned[i].handler[j] === req.params.id) {
          tasks += tasksAssigned[i]
        }
      }
    }
    res.json({
      status: 'Success',
      data: tasks
    })
  } catch (error) {
    console.log(error)
  }
})

// Update admin's profile
router.put('/updateMyProfile/:id', async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      res.redirect(`/api/admins/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
})

// As an admin I should be able to view the investors' feedback so that I can make the right improvements to the service
router.get('/getFeedback/:id', async (req, res) => {
  try {
    const companies = await Company.find()
    if (!companies[0]) {
      return res.status(400).json({
        status: 'Error',
        message: 'No companies found'
      })
    } else {
      var i
      var x = []
      for (i = 0; i < companies.length; i++) {
        if (companies[i].feedback) {
          x.push(companies[i].feedback)
        }
      }
      if (!x[0]) {
        return res.status(400).json({
          status: 'Error',
          message: 'No feedbacks found'
        })
      } else {
        return res.json({
          status: 'Success',
          message: `Here are the feedbacks`,
          data: x
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
