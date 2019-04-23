// Entity model and validator
const Model = require('../models/Reviewer')
const validator = require('../validations/reviewerValidations')
const main = require('./main')
const userController = require('./userController')
// Additional Models
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Task = require('../models/Task')
const emailUserName = require('../config/keys').user
	const emailPassword = require('../config/keys').pass
	const nodemailer = require('nodemailer')
	const transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: emailUserName,
	    pass: emailPassword
	  }
	})
exports.default = async (req, res) => {
  await main.default(res, Model)
}

exports.register = async (req, res) => {
  await userController.register(req, res, validator, Model)
}
exports.login = async (req, res) => {
  await userController.login(req, res, Model, 'Reviewer')
}
exports.confirmation = async (req, res) => {
  await userController.confirmation(req, res, Model)
}
exports.create = async (req, res) => {
  await main.create(req, res, validator, Model)
}
exports.resetPassword = async (req, res) => {
  await userController.resetPassword(req, res, Model)
}
exports.read = async (req, res) => {
  await main.read(req, res, Model)
}

exports.update = async (req, res) => {
  await main.update(req, res, validator, Model)
}

exports.delete = async (req, res) => {
  await main.delete(req, res, Model)
}

exports.viewDepartmentTask = async (req, res) => {
  const reviewerId = req.params.id
  const userReviewer = await main.findById(res, Model, reviewerId)
  if (!userReviewer) {
    return
  }
  const query = { 'department': 'Reviewer' }
  const tasks = await Task.find(query)
  // view the tasks of the given depratment

  return res.json({
    status: 'Success',
    message: tasks.length ? 'Task Assigned' : 'No tasks available',
    data: tasks
  })
}
exports.reviewForms = async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await main.findById(res, Model, reviewerId)
    if (!reviewer) { // Restrict access to reviewers only.
      return
    }

    const query = { 'form.acceptedByLawyer': 1, 'form.acceptedByReviewer': -1 } // We want the forms accepted by the lawyer but not reviewed yet.
    const companies = await Company.find(query) // query the database to retrieve all available cases
    if (!companies.length) { // if no cases in the system
      return res.json({
        message: 'No forms available to review'
      })
    }
    var forms = []
    for (var i = 0; i < companies.length; i++) {
      forms.push(companies[i]) // extract form attribute only
    }
    res.json({
      status: 'Success',
      data: forms
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
exports.casePage = async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await main.findById(res, Model, reviewerId)
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return
    }

    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
}

exports.decideApplication = async (req, res) => {
  const reviewerId = req.params.reviewerId
  const companyId = req.params.companyId

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
    const reviewer = await main.findById(res, Model, reviewerId)
    if (!reviewer) {
      return
    }

    const company = await main.findById(res, Company, companyId)
    if (!company) {
      return
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

    const newData = { 'form.acceptedByReviewer': acceptedbyReviewer, 'form.reviewerID': reviewerId }
    const updatedCompany = await Company.findByIdAndUpdate(companyId, newData, { new: true })
    
    const Investorr = await Investor.findById(company.investorId)
	    const investorrEmail = Investorr.email
	    if(decision === 0){
	      transporter.sendMail({
	        to: investorrEmail,
	        subject: 'Form rejection by reviewer',
          message: `Your form has been rejected by the reviewer ${reviewer.fullName}`,
          html: `Your form has been rejected by the reviewer ${reviewer.fullName}`
	      })
	    }
	    if(decision === 1){
	      transporter.sendMail({
	        to: investorrEmail,
	        subject: 'Form acceptance by reviewer',
          message: `Your form has been accepted by the reviewer ${reviewer.fullName}`,
          html: `Your form has been accepted by the reviewer ${reviewer.fullName}`
	      })
      }
      
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
  const companyID = req.params.companyID

  const isValidId = main.validId(res, Model, reviewerID)
  if (!isValidId) {
    return
  }
  const isValidCompanyId = main.validId(res, Model, companyID)
  if (!isValidCompanyId) {
    return
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
    const reviewer = await main.findById(res, Model, reviewerId)
    if (!reviewer) { // Restrict access to reviewers only.
      return
    }

    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned.length) { // check if there's no tasks
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
      res.redirect(307, `/api/reviewers/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
exports.showLastWorked = async (req, res) => {
  try {
    const reviewerId = req.params.reviewerId
    const reviewer = await main.findById(res, Model, reviewerId)
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return
    }

    const companyId = req.params.companyId
    const requestedCase = await main.findById(res, Company, companyId)
    if (!requestedCase) { // make sure that the one accessing the page is a reviewer
      return
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
