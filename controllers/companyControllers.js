const Company = require('../models/Company')
const validator = require('../validations/companyValidations')

exports.getAll = async (req, res) => {
  const companies = await Company.find()
  res.json({
    status: 'success',
    data: companies
  })
}

exports.getByID = async (req, res) => {
  const companyId = req.params.id
  const company = await Company.findById(companyId)
  if (company) {
    res.json({
      status: 'Success',
      data: company
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Company not found',
      availableCompanies: Company
    })
  }
}

exports.create = async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const newCompany = await Company.create(req.body)
    return res.json({
      status: 'Success',
      message: `New company created with id ${newCompany.id}`,
      data: newCompany
    })
  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const currentCompany = await Company.findById(id)
    if (!currentCompany) {
      return res.status(400).json({
        status: 'Error',
        message: 'Could not find the Company you are looking for'
      })
    }

    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    const query = { '_id': id }
    const updatedCompany = await Company.findOneAndUpdate(query, req.body, { new: true })
    return res.json({
      status: 'Success',
      message: `Updated company successfully`,
      data: updatedCompany
    })
  } catch (error) {
    console.log('error')
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const companyToBeDeleted = await Company.findByIdAndRemove(id)
    if (!companyToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Company you are looking for'
      })
    }
    return res.json({
      status: 'Success',
      message: `Deleted company with id ${id}`,
      deletedCompany: companyToBeDeleted
    })
  } catch (error) {
    console.log(error)
  }
}