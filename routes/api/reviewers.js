// Load modules
const express = require('express')
const router = express.Router()

// Reviewer model
const Reviewer = require('../../models/Reviewer')
const validator = require('../../validations/reviewerValidations')

// Read all Reviewers (Default route)
router.get('/', async (req, res) => {
  const reviewers = await Reviewer.find()
  res.json({ data: reviewers })
})

// Creating a new Reviewer
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newReviewer = await Reviewer.create(req.body)
    res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
  } catch (error) {
    console.log(error)
  }
})

// Reading a specific Reviewer given id in URL
router.get('/:id', async (req, res) => {
  const revId = req.params.id
  const reviewer = await Reviewer.findOne({ _id: revId })
  if (reviewer) {
    res.json({ data: reviewer })
  } else {
    return res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      availableAdmins: await Reviewer.find()
    })
  }
})

// Update an existing Reviewer given id in URL
router.put('/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findOne({ _id: reviewerId })
    if (!reviewer) return res.status(404).send({ error: 'Reviewer does not exist' })
    await Reviewer.updateOne(req.body)
    res.json({ msg: 'Task updated successfully' })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific Reviewer given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    await Reviewer.findByIdAndRemove({ _id: reviewerId })
    res.json({ msg: 'Reviewer deleted successfully' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
