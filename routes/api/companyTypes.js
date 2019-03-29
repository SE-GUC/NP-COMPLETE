// Load modules
const express = require('express')
const router = express.Router()

// CompanyType model
const CompanyType = require('../../models/CompanyType')

// Validations
const validator = require('../../validations/companyTypeValidations')

// Read all company types (Default route)
router.get('/', async (req, res) => {
  try {
    const companyTypes = await CompanyType.find()
    res.json({ data: companyTypes })
  } catch (error) {
    console.log(error)
  }
})

// Create a new company type
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

    const newCompanyType = await CompanyType.create(data)
    return res.json({
      status: 'Success',
      message: `New company type created with id ${newCompanyType.id}`,
      data: newCompanyType
    })
  } catch (error) {
    console.log(error)
  }
})

// Reads a specific Company Type given id in URL
router.get('/:id', async (req, res) => {
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
})

// Update an existing Company Type given id in URL
router.put('/:id', async (req, res) => {
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
})

// Delete a specific Company Type given ID in URL
router.delete('/:id', async (req, res) => {
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
      deletedCompanyType: deletedCompanyType
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router