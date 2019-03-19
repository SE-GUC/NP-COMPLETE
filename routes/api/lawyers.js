// Load modules
const express = require('express')
const router = express.Router()

// Lawyer models
const Lawyer = require('../../models/Lawyer')

// Lawyer validators
const validator = require('../../validations/lawyerValidations')

// Read all Lawyers (Default route)
router.get('/', async (req, res) => {
  const lawyers = await Lawyer.find()
  res.json({ data: lawyers })
})

// Create a new Lawyer
router.post('/', async (req, res) => {
  try {
    const data = req.body

    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }

    const newLawyer = await Lawyer.create(data)
    return res.json({
      status: 'Success',
      message: `New lawyer created successfully`,
      data: newLawyer
    })
  } catch (error) {
    console.log(error)
  }
})

// Reads a specific Lawyer given id in URL
router.get('/:id', async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await Lawyer.findById(lawyerId)
    if (lawyer) {
      res.json({ data: lawyer })
    } else {
      res.status(400).json({
        status: 'Error',
        message: 'Lawyer not found'
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// Update an existing Lawyer given id in URL
router.put('/:id', async (req, res) => {
  try {
    const data = req.body
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const id = req.params.id
    const lawyer = await Lawyer.findOne({ id })

    if (!lawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'Lawyer not found'
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
    const updatedLawyer = await Lawyer.updateOne(req.body)
    return res.json({
      status: 'Success',
      message: `Updated lawyer with id ${id}`,
      data: updatedLawyer
    })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific Lawyer given ID in URL

router.delete('/:id', async (req, res) => {
  //! Delete first, ask questions later
  try {
    const lawyerId = req.params.id
    const deletedLawyer = await Lawyer.findByIdAndRemove(lawyerId)

    if (!deletedLawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'lawyer not found',
        availableLawyers: await Lawyer.find()
      })
    }

    res.json({
      status: 'Success',
      message: `Deleted lawyer with id ${lawyerId}`,
      deletedLawyer: deletedLawyer,
      remainingLawyers: await Lawyer.find()
    })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
