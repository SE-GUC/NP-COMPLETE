const express = require('express')
const Joi = require('joi')
const router = express.Router()

const Reviewer = require('../../models/Reviewer')

const reviewers = [
  new Reviewer('Omar Ayman Abdelmagied', new Date(1998, 9, 7), 'omar@gmail.com', new Date(2010, 1, 1), 6, 3000.0)
]

// Reading all reviewers
router.get('/', (req, res) => {
  res.json({ data: reviewers })
})

// Reading a specific reviewer
router.get('/:id', (req, res) => {
  const revid = req.params.id
  const reviewer = reviewers.find(reviewer => reviewer.id === revid)
  if (reviewer) { res.json(reviewer) } else {
    res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      avaliableReviewers: reviewers
    })
  }
})

// Creating a reviewer
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({

    fullName: Joi.string().min(3).max(80).required(),
    birthdate: Joi.date().iso().max(Date.now()).required(),
    email: Joi.string().email().required(),
    startDate: Joi.date().iso().max(Date.now()),
    workingHours: Joi.number().min(3).max(12).integer(),
    salary: Joi.number().min(500.0).max(10000.0)
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newReviewer = new Reviewer(value.fullName, value.birthdate, value.email, value.startDate, value.workingHours, value.salary)
    reviewers.push(newReviewer)
    return res.json({
      status: 'Success',
      message: 'New Reviewer created',
      data: newReviewer
    })
  })
})

// Updating a reviewer
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(req.body).length === 0) {
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
    workingHours: Joi.number().min(3).max(12).integer(),
    salary: Joi.number().min(500.0).max(10000.0)
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const id = req.params.id
    const reviewerToUpdate = reviewers.find(reviewer => reviewer.id === id)

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
      message: `Updated Reviewer wit id ${id}`,
      data: reviewers
    })
  })
})

// Deleting a Reviwer
router.delete('/:id', (req, res) => {
  const revid = req.params.id
  const reviewer = reviewers.find(reviewer => reviewer.id === revid)
  if (reviewer) {
    const index = reviewers.indexOf(reviewer)
    reviewers.splice(index, 1)
    res.json(reviewers)
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Sorry, This Reviewer does not Exist!',
      avaliablereviewers: reviewers
    })
  }
})

module.exports = router
