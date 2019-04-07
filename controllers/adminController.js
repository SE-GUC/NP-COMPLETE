const Task = require('../models/Task')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Investor = require('../models/Investor')
const Reviewer = require('../models/Reviewer')
const CompanyType = require('../models/CompanyType')
const ExternalEntity = require('../models/ExternalEntity')

// Validator
const validator = require('../validations/adminValidations')

exports.getAll = async (req, res) => {
  const admins = await Admin.find()
  res.json({ data: admins })
}

exports.create = async (req, res) => {
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
}

exports.getByID = async (req, res) => {
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
}

exports.update = async (req, res) => {
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
}

exports.delete = async (req, res) => {
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
}

exports.viewTask = async (req, res) => {
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
}

exports.updateDeadline = async (req, res) => {
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
}

exports.publishCompany = async (req, res) => {
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
      const data = { 'state': 'Established', 'establishmentDate': date }
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
}

exports.viewCases = async (req, res) => {
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
}

exports.updateProfile = async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      res.redirect(307, `/api/admins/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
}

exports.workPage = async (req, res) => {
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
    var tasks = []
    for (var i = 0; i < tasksAssigned.length; i++) {
      if (tasksAssigned[i].handler.indexOf(adminId) > -1) {
        tasks.push(tasksAssigned[i])
      }
    }
    if (!tasks) {
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks for this admin'
      })
    } else {
      return res.json({
        status: 'Success',
        data: tasks
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.getFeedback = async (req, res) => {
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
}
exports.showLastWorked = async (req, res) => {
  try {
    const adminId = req.params.adminId
    const admin = await Admin.findById(adminId)
    if (!admin) { // make sure that the one accessing the page is an admin
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }
    const companyId = req.params.companyId
    const requestedCase = await Company.findById(companyId)
    if (!requestedCase) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Case not found'
      })
    }
    const result = []
    if (requestedCase.form.acceptedByLawyer !== -1) {
      const lawyer = await Lawyer.findById(requestedCase.form.lawyerID)
      result.push('Lawyer: ' + lawyer.fullName)
    }
    if (requestedCase.form.acceptedByReviewer !== -1) {
      const reviewer = await Reviewer.findById(requestedCase.form.reviewerID)
      result.push('Reviewer: ' + reviewer.fullName)
    }
    return res.json({
      status: 'Success',
      message: `This case was last worked on by:`,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
}
