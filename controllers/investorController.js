// Entity model and validator
const Model = require('../models/Investor')
const validator = require('../validations/investorValidations')
const entityController = require('./entityController')

// Additional Models
const companyType = require('../models/CompanyType')
const companyValidator = require('../validations/companyValidations')
const Company = require('../models/Company')
const CompanyType = require('../models/CompanyType')

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

exports.cancelApplication = async (req, res) => {
  try {
    const id = req.params.id
    const currentInvestor = await Model.findById(id)
    if (!currentInvestor) {
      return res.status(100).json({
        status: 'Error',
        message: 'could not find Investor you are looking for'
      })
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({
        status: 'Error',
        message: 'You did not enter an id'
      })
    }
    const appId = req.body.id
    const myCompany = await Company.findById(appId)
    if (!myCompany) {
      return res.status(300).json({
        status: 'Error',
        message: 'could not find the Company you are looking for'
      })
    }
    if (!(myCompany.investorId === id)) {
      return res.status(400).json({
        status: 'Error',
        message: 'This is not your company'
      })
    }
    if (!(myCompany.form.acceptedByReviewer === -1)) {
      return res.status(500).json({
        status: 'Error',
        message: 'You can not cancel a reviewed application'
      })
    }
    const deletedApp = await Company.findByIdAndRemove(appId)
    return res.json({
      status: 'Success',
      message: `Cancelled the Application with id ${appId}`,
      deletedApplication: deletedApp
    })
  } catch (error) {
    console.log(error)
  }
}

exports.viewRejectedForm = async (req, res) => {
  try {
    const investorId = req.params.id
    const query1 = { '_id': investorId }
    const investor = await Model.find(query1)
    if (!investor[0]) {
      res.status(400).json({
        status: 'Error',
        message: 'Investor not found'
      })
    } else {
      const query = { 'investorId': investorId }
      const companies = await Company.find(query)
      if (!companies[0]) {
        res.status(400).json({
          status: 'Error',
          message: 'company not found'
        })
      } else {
        var x = []
        var i
        for (i = 0; i < companies.length; i++) { // to check all the investor's companies
          if (companies[i].form.acceptedByLawyer === 0) {
            x.push(companies[i].form)
          }
        }
        if (!x[0]) {
          res.status(400).json({
            status: 'Error',
            message: 'There is no rejected company yet'
          })
        } else {
          res.json({ data: x })
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

exports.editForms = async (req, res) => {
  try {
    const companyId = req.params.id
    const companyToBeUpdated = await Company.findById(companyId)
    if (!companyToBeUpdated) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Form you are looking for'
      })
    }
    if (companyToBeUpdated.form.filledByLawyer === true || companyToBeUpdated.form.acceptedByLawyer === 1) {
      return res.status(400).json({
        status: 'error',
        message: 'can not update a from that has been filled or accepted by a lawyer'
      })
    }
    const isValidated = companyValidator.editFormValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const type = companyToBeUpdated.type
    const query = { 'companyType': type }
    const companyTypeTemp = await companyType.find(query)
    if (!companyTypeTemp) {
      return res.status(400).json({
        status: 'error',
        message: 'It is empty'
      })
    }

    const fieldsTemp = companyTypeTemp[0].fields
    const dataTypesArray = companyTypeTemp[0].types
    const data = req.body.data

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

    companyToBeUpdated.form.data = req.body.data
    const query1 = { '_id': companyId }
    const updatedCompany = await Company.findOneAndUpdate(query1, companyToBeUpdated, { new: true })
    return res.json({
      status: 'Success',
      message: `Edited Form of Company with id ${companyId}`,
      updatedCompany: updatedCompany
    })
  } catch (error) {
    console.log(error)
  }
}
exports.trackApplication = async (req, res) => {
  try {
    const id = req.params.id
    Company
      .find({
        investorId: id
      })
      .then(result => res.json({
        status: 'Success',
        message: `Companies for investor ${id}`,
        companies: result
      }))
  } catch (error) {
    console.error(error)
  }
}

exports.getCompanies = async (req, res) => {
  try {
    const investorId = req.params.id
    const query = { 'investorId': investorId }
    const companies = await Company.find(query)
    return res.json({
      status: 'Success',
      message: `companies`,
      data: companies
    })
  } catch (error) {
    console.log(error)
  }
}

exports.fillForm = async (req, res) => {
  try {
    const investorId = req.params.id
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
      'investorId': investorId,
      'form.acceptedByLawyer': -1,
      'form.acceptedByReviewer': -1,
      'form.filledByLawyer': false,
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

exports.payFees = async (req, res) => {
  try {
    const investorId = req.params.id
    const investor = await Model.findById({ '_id': investorId })
    if (!investor) {
      return res.status(400).json({
        status: 'Error',
        message: 'investor doesnt exist'
      })
    }
    const companyId = req.body.id
    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(404).json({
        status: 'Error',
        message: 'no company matches this ID'
      })
    }
    if (company.investorId !== investorId) {
      return res.status(400).json({
        status: 'Error',
        message: 'you cant pay fees for a company that doesnt belong to you'
      })
    }
    if (company.accepted === false) {
      return res.status(400).json({
        status: 'Error',
        message: 'can not pay fees when form is not yet accepted'
      })
    }
    const query2 = { '_id': companyId }
    const data2 = { 'state': 'Established',
      'establishmentDate': Date.now(),
      'form.paid': true,
      'fees': 0
    }
    const updateCompany = await Company.findByIdAndUpdate(query2, data2, { new: true })
    return res.json({
      status: 'Your copmany is now established',
      data: updateCompany
    })
  } catch (error) {
    console.log(error)
  }
}

exports.readDescription = async (req, res) => {
  const type = req.params.type
  const companyType = await CompanyType.find({ 'companyType': type })
  if (companyType) {
    res.json({
      status: 'Success',
      description: companyType.description
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Company Type not found'
    })
  }
}

// As an investor I should be able to review the online service and give suggestions, so that the service can be improved.
exports.reviewOnlineService = async (req, res) => {
  try {
    const investorId = req.params.investorId
    const investor = await Model.findById(investorId)
    if (!investor) {
      return res.status(400).json({
        status: 'Error',
        message: 'This investor doesnt exist'
      })
    }
    const companyId = req.params.companyId
    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(400).json({
        status: 'Error',
        message: 'This company doesnt exist'
      })
    }
    if (investorId === company.investorId) {
      const newData = { 'feedback': req.body.feedback }
      const updatedCompany = await Company.findByIdAndUpdate(companyId, newData, { new: true })
      res.json({
        status: 'Success',
        data: updatedCompany
      })
    } else {
      res.json({
        status: 'Error',
        message: 'You are not the owner of this company'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// helper functions
const isValidDate = stringDate => {
  const date = new Date(stringDate)
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
}