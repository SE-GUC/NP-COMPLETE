// required models
const CompanyType = require('../models/CompanyType')
const validator = require('../validations/companyTypeValidations')

exports.getAll = async (req, res) => {
  try {
    const companyTypes = await CompanyType.find()
    res.json({ data: companyTypes })
  } catch (error) {
    console.log(error)
  }
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

    const newCompanyType = await CompanyType.create(data)
    return res.json({
      status: 'Success',
      message: `New company type created with id ${newCompanyType.id}`,
      data: newCompanyType
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.getByID = async (req, res) => {
  const companyTypeId = req.params.id
  try {
    const companyType = await CompanyType.findById(companyTypeId)
    if (!companyType) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company Type not found'
      })
    }
    res.json({
      status: 'Success',
      data: companyType
    })
  } catch (error) {
    console.log(error)
  }
}
exports.update = async (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const companyTypeId = req.params.id
    const companyTypeToUpdate = await CompanyType.findById(companyTypeId)

    if (!companyTypeToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company Type not found'
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

    const query = { '_id': companyTypeId }
    const updatedcompanyType = await CompanyType.findByIdAndUpdate(query, data, { new: true })
    return res.json({
      status: 'Success',
      message: `Updated company Type with id ${companyTypeId}`,
      data: updatedcompanyType
    })
  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res) => {
  try {
    const companyTypeId = req.params.id
    const deletedCompanyType = await CompanyType.findByIdAndRemove(companyTypeId)

    if (!deletedCompanyType) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company Type not found'
      })
    }
    res.json({
      status: 'Success',
      message: `Deleted Company Type with id ${companyTypeId}`,
      data: deletedCompanyType
    })
  } catch (error) {
    console.log(error)
  }
}
