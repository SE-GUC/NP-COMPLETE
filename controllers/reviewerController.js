// requiring mongoose for id validations
const mongoose = require('mongoose')
// Entity model and validator
const Model = require('../models/Reviewer')
const validator = require('../validations/reviewerValidations')
const entityController = require('./entityController')

// Additional Models
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Task = require('../models/Task')

exports.default = async (req, res) => {
  await entityController.default(res, Model)
}

exports.create = async (req, res) => {
  await entityController.create(req, res, validator, Model)
}

exports.read = async (req, res) => {
  await entityController.read(req, res, Model)
}

exports.update = async (req, res) => {
  await entityController.update(req, res, validator, Model)
}

exports.delete = async (req, res) => {
  await entityController.delete(req, res, Model)
}

exports.viewDepartmentTask = async (req, res) => {
  const reviewerId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }
  const userReviewer = await Model.findById(reviewerId)
  if (!userReviewer) {
    return res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      availableReviewers: await Model.find()
    })
  }
  const query = { 'department': 'Reviewer' }
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
exports.reviewForms = async (req, res) => {
  try {
    const reviewerId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    const reviewer = await Model.findById(reviewerId)
    if (!reviewer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only reviewers have access to this page',
        availableReviewers: await Model.find()
      })
    }
    const query = { 'form.acceptedByLawyer': 1, 'form.acceptedByReviewer': -1 } // We want the forms accepted by the lawyer but not reviewed yet.
    const companies = await Company.find(query) // query the database to retrieve all available cases
    if (!companies) { // if no cases in the system
      return res.json({
        message: 'No forms available to review'
      })
    }
    var forms = []
    for (var i = 0; i < companies.length; i++) {
      forms.push(companies[i].form) // extract form attribute only
    }
    res.json({ data: forms })
  } catch (error) {
    console.log(error)
  }
}
exports.casePage = async (req, res) => {
  try {
    const reviewerId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    const reviewer = await Model.findById(reviewerId)
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Reviewer access required'
      })
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
}

exports.decideApplication = async (req, res) => {
  const reviewerId = req.params.reviewerId
  if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }
  const companyId = req.params.companyId
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }
  const decision = req.body.decision

  if (decision === null || decision === undefined) {
    return res.status(400).json({
      status: 'Error',
      message: 'Decision not given'
    })
  }

  if (typeof decision !== 'boolean') {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable decision needs to be a boolean type'
    })
  }
  try {
    const reviewer = await Model.findById(reviewerId)
    if (!reviewer) {
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }

    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(400).json({
        status: 'Error',
        message: 'Form not found'
      })
    }

    if (company.form.acceptedByLawyer !== 1) {
      return res.status(400).json({
        status: 'Error',
        message: 'Form not accepted by lawyer'
      })
    }

    if (company.form.acceptedByReviewer === 1) {
      return res.status(400).json({
        status: 'Error',
        message: 'Form already accepted by reviewer'
      })
    }

    let acceptedbyReviewer
    if (decision === true) {
      acceptedbyReviewer = 1
    } else {
      acceptedbyReviewer = 0
    }

    const query = { '_id': companyId }
    const newData = { 'form.acceptedByReviewer': acceptedbyReviewer, 'form.reviewerID': reviewerId }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    res.json({
      status: 'Success',
      message: `Form acceptance by reviewer status is: ${decision}`,
      data: updatedCompany.form
    })
  } catch (error) {
    console.log(error)
  }
}

exports.addComment = async (req, res) => {
  const reviewerID = req.params.reviewerID
  if (!mongoose.Types.ObjectId.isValid(reviewerID)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }
  const companyID = req.params.companyID
  if (!mongoose.Types.ObjectId.isValid(companyID)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }

  try {
    const query = { '_id': companyID, 'form.acceptedByReviewer': 0, 'form.reviewerID': reviewerID }
    const newData = { 'form': { 'comment': req.body.comment } }
    const companyEdited = await Company.findOneAndUpdate(query, newData, { new: true })
    if (!companyEdited) {
      return res.status(400).json({
        status: 'Error',
        message: 'Failed to find company'
      })
    }

    res.json({
      status: 'Success',
      message: 'Added comment to form',
      data: companyEdited
    })
  } catch (error) {
    console.log(error)
  }
}
exports.workPage = async (req, res) => {
  try {
    const reviewerId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    const reviewer = await Model.findOne({ _id: reviewerId })
    if (!reviewer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only Internal Users have access to this page',
        availableReviewers: await Model.find()
      })
    }
    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned) { // check if there's no tasks
      return res.json({
        message: 'No tasks available'
      })
    }
    var tasks = []
    for (var i = 0; i < tasksAssigned.length; i++) {
      if (tasksAssigned[i].handler.indexOf(reviewerId) > -1) {
        tasks.push(tasksAssigned[i])
      }
    }
    if (!tasks) {
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks for this reviewer'
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

exports.updateProfile = async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    console.log(stored)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: 'Error',
          message: 'not a valid ID'
        })
      }
      res.redirect(307, `/api/reviewers/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
exports.showLastWorked = async (req, res) => {
  try {
    const reviewerId = req.params.reviewerId
    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    const reviewer = await Model.findById(reviewerId)
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }
    const companyId = req.params.companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
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
      const reviewer = await Model.findById(requestedCase.form.reviewerID)
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
