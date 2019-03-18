// Load modules
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
console.log(mongoose)

// Company model and validator
const Company = require('../../models/Company')
const validator = require('../../validations/companyValidations')

// Read all Companies (Default route)
router.get('/', async (req, res) => {
  const companies = await Company.find()
  res.json({ data: companies })
})
// Create a new Company
router.post('/', async (req, res) => {
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
    console.log('error')
  }
})

// Reads a specific Company given id in URL
router.get('/:id', async (req, res) => {
  const companyId = req.params.id
  const company = await Company.findById(companyId)
  if (company) {
    res.json({ data: company })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Company not found',
      availableCompanies: Company
    })
  }
})

// Update an existing Company given id in URL

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const currentCompany = await Company.findById({ id })
    if (!currentCompany) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Company you are looking for',
        availableCompany: Company
      })
    }

    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    const updatedCompany = await Company.updateOne(req.body)
    return res.json({
      status: 'Success',
      message: `Updated company with id ${updatedCompany.id}`,
      data: updatedCompany
    })
  } catch (error) {
    console.log('error')
  }
})

// Delete a specific Company given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const companyToBeDeleted = await Company.findByIdAndRemove(id)
    return res.json({
      status: 'Success',
      message: `Deleted company with id ${id}`,
      deletedCompany: companyToBeDeleted,
      remainingCompanies: Company
    })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
