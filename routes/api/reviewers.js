// Load modules
const express = require('express')
const router = express.Router()

// Reviewer model
const Reviewer = require('../../models/Reviewer')
const validator = require('../../validations/reviewerValidations')
const Company = require('../../models/Company')
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
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const reviewer = await Reviewer.findById(reviewerId)
    if (!reviewer) {
      return res.status(404).json({
        status: 'Error',
        message: 'Reviewer does not exist'
      })
    }

    const query = { '_id': reviewerId }
    const updatedReviewer = await Reviewer.findByIdAndUpdate(query, req.body)
    res.json({
      status: 'Success',
      message: 'Task updated successfully',
      data: updatedReviewer
    })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific Reviewer given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewerToBeDeleted = await Reviewer.findByIdAndRemove(reviewerId)
    const AllReviewers = await Reviewer.find()
    await Reviewer.findByIdAndRemove({ _id: reviewerId })
    if (!reviewerToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        message: 'Reviewer not found',
        availableReviewers: await Reviewer.find()
      })
    }
    return res.json({
      status: 'Success',
      message: `Deleted reviewer with id ${reviewerId}`,
      deletedReviewer: reviewerToBeDeleted,
      remainingReviewers: AllReviewers
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/formstoReview', async (req, res) => {
  // const reviewerId = req.params.id
  const companies = await Company.find({ 'form.AcceptedByLawyer': 1, 'forms.AcceptedByReviewer': 0 })
  if (companies == null) {
    return res.json({
      message: 'No forms available to review'
    })
  }
  const forms = companies.forms.data
  res.json({ data: forms })
})

module.exports = router
