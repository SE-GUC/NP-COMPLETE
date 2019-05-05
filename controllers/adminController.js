// Entity model and validator
const Model = require('../models/Admin')
const validator = require('../validations/adminValidations')
const main = require('./main')
const userController = require('./userController')
const dbController = require('./dbController')

const user = require('../config/keys').user
const pass = require('../config/keys').pass
// Additional models
const Admin = require('../models/Admin')
const Task = require('../models/Task')
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Reviewer = require('../models/Reviewer')
const Investor = require('../models/Investor')
const nodemailer = require('nodemailer')
const emailUserName = require('../config/keys').user
const emailPassword = require('../config/keys').pass
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
exports.resetPassword = async (req, res) => {
  await userController.resetPassword(req, res, Model)
}
exports.confirmation = async (req, res) => {
  await userController.confirmation(req, res, Model)
}
exports.register = async (req, res) => {
  await userController.register(req, res, validator, Model)
}
exports.login = async (req, res) => {
  await userController.login(req, res, Model, 'Admin')
}
exports.create = async (req, res) => {
  await main.create(req, res, validator, Model)
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
  const adminId = req.params.id
  const userAdmin = await main.findById(res, Model, adminId)
  if (!userAdmin) {
    return
  }
  const query = { 'department': 'Admin' }
  const tasks = await Task.find(query)
  return res.json({
    status: 'Success',
    message: tasks.length ? 'Tasks Assigned' : 'No tasks available',
    data: tasks
  })
}

exports.registerUsers = async (req, res) => {
  const adminId = req.params.adminId
  const userAdmin = await main.findById(res, Model, adminId)
  if (!userAdmin) {
    return res.status(400).json({
      status: 'Error',
      message: 'There is no such admin'
    })
  }
  const userId = req.params.userId
  const admins = await Admin.findById(userId)
  const lawyers = await Lawyer.findById(userId)
  const reviewers = await Reviewer.findById(userId)
  const query = { '_id': userId }
  const data = req.body
  const updatedData = {
    ...data,
    startDate: Date.now()
  }
  if (admins) {
    const registeredUser = await Admin.findOneAndUpdate(query, updatedData, { new: true })
    res.json({
      status: 'Success',
      message: 'Approved the user',
      data: registeredUser
    })
  }
  if (lawyers) {
    const registeredUser = await Lawyer.findOneAndUpdate(query, updatedData, { new: true })
    res.json({
      status: 'Success',
      message: 'Approved the user',
      data: registeredUser
    })
  }
  if (reviewers) {
    const registeredUser = await Reviewer.findOneAndUpdate(query, updatedData, { new: true })
    res.json({
      status: 'Success',
      message: 'Approved the user',
      data: registeredUser
    })
  }
}

exports.showUnapproved = async (req, res) => {
  const adminId = req.params.id
  const userAdmin = await main.findById(res, Model, adminId)
  if (!userAdmin) {
    return res.status(400).json({
      status: 'Error',
      message: 'There is no such admin'
    })
  }
  const query = { 'acceptedByAdmin': false }
  const admins = await Admin.find(query)
  const lawyers = await Lawyer.find(query)
  const reviewers = await Reviewer.find(query)
  const Unapproved = []
  const data = Unapproved.concat(admins, lawyers, reviewers)
  return res.json({
    status: 'Success',
    message: data.length ? 'Unapproved users' : 'No unapproved users available',
    data: data
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

    const adminToUpdate = await main.findById(res, Model, adminId)
    if (!adminToUpdate) {
      return
    }

    const taskID = req.body.TaskID
    const task = await main.findById(res, Task, taskID)
    if (!task) {
      return
    }
    // update the deadline (if given in the body)
    const query = { '_id': taskID }
    const updatedTask = await Task.findOneAndUpdate(query, req.body, { new: true })
    res.json({
      status: 'Success',
      message: `Updated Task with id ${taskID}`,
      data: updatedTask
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.publishCompany = async (req, res) => {
  try {
    const id = req.params.id
    const currentCompany = await main.findById(res, Company, id)
    if (!currentCompany) { // check if the company exists
      return
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
      const Investorr = await Investor.findById(currentCompany.investorId)
	    const investorrEmail = Investorr.email
      transporter.sendMail({
        to: investorrEmail,
        subject: 'Publlished company',
        message: `Your form has been accepted by a reviewer`,
        html: `Your company ${currentCompany.name} has been published`
      })
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
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.viewCases = async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await main.findById(res, Model, adminId)
    if (!admin) { // makes sure that the one accessing the data is an admin
      return
    }

    return res.redirect(307, '/api/companies/') // redirect to companies get all route
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
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
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.workPage = async (req, res) => {
  try {
    const adminId = req.params.id
    const admin = await main.findById(res, Model, adminId)
    if (!admin) { // Restrict access to reviewers only.
      return
    }

    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned.length) { // no tasks
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
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.getFeedback = async (req, res) => {
  try {
    const companies = await Company.find()
    if (!companies.length) {
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
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
exports.showLastWorked = async (req, res) => {
  try {
    const adminId = req.params.adminId
    const admin = await main.findById(res, Model, adminId)
    if (!admin) { // make sure that the one accessing the page is an admin
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
      result.push(`Lawyer: ${lawyer && lawyer !== null ? lawyer.fullName : 'Unregistered'}`)
    }
    if (requestedCase.form.acceptedByReviewer !== -1) {
      const reviewer = await Reviewer.findById(requestedCase.form.reviewerID)
      result.push(`Reviewer: ${reviewer && reviewer !== null ? reviewer.fullName : 'Unregistered'}`)
    }
    return res.json({
      status: 'Success',
      message: `This case was last worked on by:`,
      data: result
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.DBRepop = async (req, res) => {
  await dbController.DBRepop(res)
}

exports.RepopCompanies = async (req, res) => {
  await dbController.RepopCompanies(res)
}
exports.sendAnnouncement = async (req, res) => {
  try {
    const data = req.body
    const validate = validator.sendAnnouncement(data)
    if (validate.error) {
      return res.status(400).json({
        status: 'Error',
        message: validate.error.details[0].message })
    }
    const recipients = req.body.recipients
    var mailingList = []
    switch (recipients) {
      case 'Investors' :mailingList = await Investor.find()
        break
      case 'Lawyers': mailingList = await Lawyer.find()
        break
      case 'Reviewers': mailingList = await Reviewer.find()
        break
      default : mailingList = await allMails()
    }
    console.log(mailingList)
    let emails = ''
    for (var i = 0; i < mailingList.length; i++) {
      if (i !== (mailingList.length - 1)) {
        emails += mailingList[i].email + ', '
      } else {
        emails += mailingList[i].email
      }
    }
    const output = `
    <p> You received a new announcement </p>
    <h3> Message </h3>
    <p> ${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"GAFI Admin" <gafiweb2019@gmail.com>', // sender address
      to: emails, // list of receivers
      subject: 'Admin announcement', // Subject line
      html: output // html body
    })

    console.log('Message sent: %s', info.messageId)
    return res.json({
      status: 'Success',
      message: 'Your message has been sent' })
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}
const allMails = async () => {
  var mails = []
  const investors = await Investor.find()
  const lawyers = await Lawyer.find()
  const reviewers = await Reviewer.find()
  mails = mails.concat(investors, lawyers, reviewers)
  return mails
}
