// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Reviewer model
const Reviewer = require('../../models/Reviewer')

const reviewers = [
  new Reviewer('Omar Ayman Abdelmagied', '1998-09-07', 'omar@gmail.com', '2010-01-01', 6, 3000)
]

// Read all Reviewers (Default route)
router.get('/', (req, res) => res.json({ data: reviewers }))

// Creating a new Reviewer
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80).required(),
    birthdate: Joi.date().iso().max(Date.now()).required(),
    email: Joi.string().email().required(),
    startDate: Joi.date().iso().max(Date.now()),
    workingHours: Joi.number().min(3).integer(),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newReviewer = new Reviewer(
      value.fullName,
      value.birthdate,
      value.email,
      value.startDate,
      value.workingHours,
      value.salary
    )
    reviewers.push(newReviewer)
    return res.json({
      status: 'Success',
      message: `New reviewer created with id ${newReviewer.id}`,
      data: newReviewer
    })
  })
})

// Reading a specific Reviewer given id in URL
router.get('/:id', (req, res) => {
  const revid = req.params.id
  const reviewer = reviewers.find(reviewer => reviewer.id === revid)
  if (reviewer) {
    res.json({ data: reviewer })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      avaliableReviewers: reviewers
    })
  }
})

// Update an existing Reviewer given id in URL
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80),
    birthdate: Joi.date().iso().max(Date.now()),
    email: Joi.string().email(),
    startDate: Joi.date().iso().max(Date.now()),
    workingHours: Joi.number().min(3).integer(),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const reviewerId = req.params.id
    const reviewerToUpdate = reviewers.find(reviewer => reviewer.id === reviewerId)

    if (!reviewerToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Reviewer not found'
      })
    }

    Object.keys(value).forEach(key => {
      if (value[key]) {
        reviewerToUpdate[key] = value[key]
      }
    })

    return res.json({
      status: 'Success',
      message: `Updated Reviewer wit id ${reviewerId}`,
      data: reviewerToUpdate
    })
  })
})

// Delete a specific Reviewer given ID in URL
router.delete('/:id', (req, res) => {
  const reviewerId = req.params.id
  const reviewer = reviewers.find(reviewer => reviewer.id === reviewerId)
  if (reviewer) {
    const index = reviewers.indexOf(reviewer)
    reviewers.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted reviewer with id ${reviewerId}`,
      remainingReviewers: reviewers
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      avaliableReviewers: reviewers
    })
  }
})

module.exports = router
