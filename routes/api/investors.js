// Load modules
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
console.log(mongoose)

// Investor model and validator
const Investor = require('../../models/Investor')
const Company = require('../../models/Company')
const validator = require('../../validations/investorValidations')

// Read all Investors (Default route)
router.get('/', async (req, res) => {
  const investors = await Investor.find()
  res.json({ data: investors })
})
// Create a new Investor
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const newInvestor = await Investor.create(req.body)
    return res.json({
      status: 'Success',
      message: `New investor created with id ${newInvestor.id}`,
      data: newInvestor
    })
  } catch (error) {
    console.log('error')
  }
})

// Reads a specific Investor given id in URL
router.get('/:id', async (req, res) => {
  const investorId = req.params.id
  const investor = await Investor.findById(investorId)
  if (investor) {
    res.json({ data: investor })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Investor not found',
      availableInvestors: Investor
    })
  }
})

// Update an existing Investor given id in URL
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const currentInvestor = await Investor.findById(id)
    if (!currentInvestor) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Investor you are looking for',
        availableInvestors: Investor
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
    const updatedInvestor = await Investor.findByIdAndUpdate(query, req.body)

    return res.json({
      status: 'Success',
      message: `Updated investor successfully`,
      data: updatedInvestor
    })
  } catch (error) {
    console.log('error')
  }
})

// Delete a specific Investor given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const investorToBeDeleted = await Investor.findByIdAndRemove(id)
    const AllInvestors = await Investor.find()
    if (!investorToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Investor you are looking for',
        availableInvestors: AllInvestors
      })
    }
    return res.json({
      status: 'Success',
      message: `Deleted investor with id ${id}`,
      deletedInvestor: investorToBeDeleted,
      remainingInvestors: AllInvestors
    })
  } catch (error) {
    console.log(error)
  }
})

// as an investor i should be able to update forms rejected by the lawyer
router.put('/editForm/:id', async (req, res) => {
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
    const isValidated = validator.editFormValidation(req.body)
    if (isValidated.error) { // we need to add more checks depending on company type
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    companyToBeUpdated.form.data = req.body.data
    const query = { '_id': companyId }
    const updatedCompany = await Company.findOneAndUpdate(query, companyToBeUpdated)
    return res.json({
      status: 'Success',
      message: `Edited Form of Company with id ${companyId}`,
      updatedCompany: updatedCompany
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
