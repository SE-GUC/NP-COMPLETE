// Load modules
const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')

// Investor model and validator
const Investor = require('../../models/Investor')
const validator = require('../../validations/investorValidations')

// Temporary data created (acts as a mock database)
const investors = [
  new Investor('Mohamed Ayman', new Date('1998-10-16'), 'mohamedAyman@gmail.com'),
  new Investor('Mohamed Farid', new Date('1998-12-18'), 'mohamedFarid@hotmail.com'),
  new Investor('Bill Marks', new Date('1990-05-21'), 'billMarks@outlook.com')
]

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
  const investor = await investors.find(investor => investor.id === investorId)
  if (investor) {
    res.json({ data: investor })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Investor not found',
      availableInvestors: investors
    })
  }
})

// Update an existing Investor given id in URL
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const currentInvestor = await Investor.findOne({ id })
    if (!currentInvestor) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Investor you are looking for',
        availableInvestors: investors
      })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const updatedInvestor = await investors.updateOne(req.body)
    return res.json({
      status: 'Success',
      message: `Updated investor with id ${updatedInvestor.id}`,
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
    return res.json({
      status: 'Success',
      message: `Deleted investor with id ${id}`,
      deletedInvestor: investorToBeDeleted,
      remainingReviewers: Investor
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
