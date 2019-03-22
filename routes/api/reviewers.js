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
      availableReviewers: await Reviewer.find()
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

router.get('/:id/formsToReview', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findOne({ _id: reviewerId })
    if (!reviewer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only reviewers have access to this page',
        availableReviewers: await Reviewer.find()
      })
    }
    const query = { 'form.acceptedByLawyer': 1, 'form.acceptedByReviewer': 0 } // We want the forms accepted by the lawyer but not reviewed yet.
    const companies = await Company.find(query) // query the database to retrieve all available cases
    if (!companies) { // if no cases in the system
      return res.json({
        message: 'No forms available to review'
      })
    }
    var forms = ''
    for (var i = 0; i < companies.length; i++) {
      forms += companies[i].form + '\n' // extract form attribute only
    }
    res.json({ data: forms })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id/casesPage', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findOne({ _id: reviewerId })
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'You do not have access to this page'
      })
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
