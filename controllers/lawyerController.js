// Entity model and validator
const Model = require('../models/Lawyer')
const validator = require('../validations/lawyerValidations')
const main = require('./main')
const userController = require('./userController')
// Additional Models
const Reviewer = require('../models/Reviewer')
const Company = require('../models/Company')
const ExternalEntity = require('../models/ExternalEntity')
const Task = require('../models/Task')
const companyType = require('../models/CompanyType')
const Investor = require('../models/Investor')

// Company validators
const companyValidator = require('../validations/companyValidations')

exports.default = async (req, res) => {
  await main.default(res, Model)
}

exports.register = async (req, res) => {
  await userController.register(req, res, validator, Model)
}
exports.login = async (req, res) => {
  await userController.login(req, res, Model)
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
  const lawyerId = req.params.id
  const userLawyer = await main.findById(res, Model, lawyerId)
  if (!userLawyer) {
    return
  }
  const query = { 'department': 'Lawyer' }
  const tasks = await Task.find(query)
  // view the tasks of the given depratment
  res.json({
    status: 'Success',
    message: tasks.length ? 'Task Assigned' : 'No tasks available',
    data: tasks
  })
}

exports.newForm = async (req, res) => {
  try {
    const isValidated = companyValidator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const type = req.body.type
    const query = { 'companyType': type }
    const companyTypeTemp = await companyType.find(query)
    if (companyTypeTemp.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'It is empty'
      })
    }
    const fieldsTemp = companyTypeTemp[0].fields
    const dataTypesArray = companyTypeTemp[0].types
    const data = req.body.form.data
    if (data.length !== dataTypesArray.length) {
      return res.status(400).json({
        status: 'Error',
        message: 'You must enter all the required data'
      })
    }
    for (let i = 0; i < dataTypesArray.length; i++) {
      const dataType = typeof (data[i])
      if (!(dataType === dataTypesArray[i])) {
        if (!(dataTypesArray[i] === 'date' && isValidDate(data[i]))) {
          return res.status(400).json({
            status: 'Error',
            message: 'wrong data type: ' + fieldsTemp[i] + ' should be ' + dataTypesArray[i]
          })
        }
      }
    }
    const newCompany = await Company.create(req.body)
    const companyId = newCompany._id
    const query2 = { '_id': companyId }
    const data2 = { 'state': 'Pending',
      'accepted': false,
      'form.acceptedByLawyer': 1,
      'form.acceptedByReviewer': -1,
      'form.filledByLawyer': true,
      'form.paid': false }
    const updateCompany = await Company.findByIdAndUpdate(query2, data2, { new: true })
    return res.json({
      status: 'You applied for establishing a new copmany',
      data: updateCompany
    })
  } catch (error) {
    console.log(error)
  }
}

exports.viewForm = async (req, res) => {
  try {
    const investorId = req.params.id
    const isValidId = main.validId(res, Investor, investorId)
    if (!isValidId) {
      return
    }

    const query = { 'investorId': investorId }
    const companies = await Company.find(query)
    if (!companies.length) {
      return res.status(404).json({
        status: 'error',
        message: 'Form not found'
      })
    }
    return res.json({
      status: 'Success',
      data: companies
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.review = async (req, res) => {
  try {
    // Check if the body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to put a review'
      })
    }
    // check if the review is given in the body or not
    const review = req.body.acceptedByLawyer
    if (review === null || review === undefined) {
      return res.status(400).json({
        status: 'Error',
        message: 'Review not given'
      })
    }
    // check if the value of the review is valid
    if (review !== 0 && review !== 1) {
      return res.status(400).json({
        status: 'Error',
        message: 'Review value is not valid'
      })
    }

    // create the update body
    const newData = { 'form.acceptedByLawyer': req.body.acceptedByLawyer, 'form.lawyerID': req.params.lawyerID }
    if (review === 0) {
      // chech for comment
      const comment = req.body.comment
      if (!comment) {
        return res.status(400).json({
          status: 'Error',
          message: 'Comment not given'
        })
      }
      if (typeof (comment) !== 'string') {
        return res.status(400).json({
          status: 'Error',
          message: 'Comment type is not valid'
        })
      }
      newData['form.comment'] = comment
    }
    // check if the lawyer exists
    const lawyer = await Model.findById(req.params.lawyerID)
    if (!lawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'This lawyer doesnt exist'
      })
    }
    // check if the company exists
    const company = await main.findById(res, Company, req.params.companyID)
    if (!company) {
      return
    }

    if (company.form.acceptedByLawyer !== -1) {
      return res.status(400).json({
        status: 'Error',
        message: 'This form is already reviewed'
      })
    }

    // Changing value to the new value
    const updatedCompany = await Company.findByIdAndUpdate(req.params.companyID, newData, { new: true })

    return res.json({
      status: 'Success',
      message: `Reviewed Form of Company with id ${req.params.id}`,
      data: updatedCompany.form
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.editForm = async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId
    const companyId = req.params.companyId

    const lawyer = await main.findById(res, Model, lawyerId)
    if (!lawyer) {
      return
    }

    const isValidated = companyValidator.editFormValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    const update = {
      $set: {
        'form.data': req.body.data,
        'form.acceptedByLawyer': 1
      }
    }
    const updatedCompany = await main.findByIdAndUpdate(res, Company, companyId, update)
    if (!updatedCompany) {
      return
    } else {
      return res.json({
        status: 'Success',
        message: `Edited requested formm of Company with id ${companyId}`,
        updatedCompany: updatedCompany
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.casesPage = async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await main.findById(res, Model, lawyerId)
    if (!lawyer) { // make sure that the one accessing the page is a lawyer
      return
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.addComment = async (req, res) => {
  const lawyerId = req.params.lawyerId
  const companyId = req.params.companyId

  const comment = req.body.comment
  if (!comment) {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable comment is required'
    })
  }
  if (typeof comment !== 'string') {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable comment needs to be a string'
    })
  }
  try {
    const lawyer = await main.findById(res, Model, lawyerId)
    if (!lawyer) {
      return
    }

    const company = await main.findById(res, Company, companyId)
    if (!company) {
      return
    }

    if (company.form.acceptedByLawyer !== 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'Form not rejected by lawyer'
      })
    }

    const query = { '_id': companyId }
    const newData = { 'form.comment': comment }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    res.json({
      status: 'Success',
      message: `Added comment: ${comment} to form of company with id: ${companyId}`,
      data: updatedCompany.form
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.workPage = async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await main.findById(res, Model, lawyerId)
    if (!lawyer) { // Restrict access to reviewers only.
      return
    }

    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned.length) { // check if there's no tasks
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks available'
      })
    }
    const tasks = []
    for (var i = 0; i < tasksAssigned.length; i++) {
      if (tasksAssigned[i].handler.indexOf(lawyerId) > -1) {
        tasks.push(tasksAssigned[i])
      }
    }
    if (!tasks) {
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks for this lawyer'
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

exports.calculateFees = async (req, res) => {
  try {
    const companyId = req.params.id
    const company = await main.findById(res, Company, companyId)
    if (!company) {
      return
    }

    const type = company.type
    const CompanyType = companyType.findOne({ companyType: type })
    if (!CompanyType) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company type cannot be found'
      })
    }
    const fields = CompanyType.fields
    var i
    for (i = 0; i < fields.length; i++) {
      if (fields[i] === 'capital') {
        break
      }
    }
    const capital = company.form.data[i]
    const fees = calculateFees(capital)

    const query = { '_id': companyId }
    const newData = { 'form.fees': fees }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    return res.json({
      status: 'Success',
      message: 'Company fees calculated',
      company: updatedCompany
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.updateMyProfile = async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      res.redirect(307, `/api/lawyers/${id}`)
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
    const lawyerId = req.params.lawyerId
    const lawyer = await main.findById(res, Model, lawyerId)
    if (!lawyer) { // make sure that the one accessing the page is a reviewer
      return
    }

    const companyId = req.params.companyId
    const requestedCase = await main.findById(res, Company, companyId)
    if (!requestedCase) { // make sure that the one accessing the page is a lawyer
      return
    }

    const result = []
    if (requestedCase.form.acceptedByLawyer !== -1) {
      const lawyer = await Model.findById(requestedCase.form.lawyerID)
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
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

// helper methods
const calculateFees = async capital => {
  const entities = await ExternalEntity.find()
  var fees = 0
  entities.forEach(entity => {
    var fee = entity.feesPercentage * capital
    if (fee < entity.feesMin) {
      fee = entity.feesMin
    }
    if (fee > entity.feesMax) {
      fee = entity.feesMax
    }
    fees += fee
  })
  return fees
}
const isValidDate = stringDate => {
  const date = new Date(stringDate)
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
}
