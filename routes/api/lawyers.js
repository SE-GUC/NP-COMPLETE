// Dependencies
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Models
const Lawyer = require('../../models/Lawyer')
// temporary data created as if it was pulled out of the database ...
const lawyers = [
  new Lawyer('Barney', '2000-05-5', 'burney@gmail.com'),
  new Lawyer('Ahmed', '1990-05-5', 'ahmed@gmail.com'),
  new Lawyer('Mariam', '1995-1-1', 'mariam@gmail.com', '2005-5-5', 8, 5000)
]

// Create a new lawyer
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    birthdate: Joi.date().required().iso(),
    startDate: Joi.date().iso().required(),
    workingHours: Joi.number().min(5),
    salary: Joi.number()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }

    const newLawyer = new Lawyer(
      value.fullName,
      value.email,
      value.birthdate,
      value.startDate,
      value.workingHours,
      value.salary
    )
    lawyers.push(newLawyer)
    return res.json({
      status: 'success',
      message: `New Lawyer created with id ${newLawyer.id}`,
      data: newLawyer
    })
  })
})

// get all lawyers
router.get('/', (req, res) => res.json({ data: lawyers }))

// Get a certain lawyer using id
router.get('/:id', (req, res) => {
  const lawyerId = req.params.id
  const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
  if (lawyer) {
    res.json({ lawyer })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Lawyer not found',
      data: lawyers })
  }
})

// delete lawyer using id

router.delete('/:id', (req, res) => {
  const lawyerId = req.params.id
  const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
  const index = lawyers.indexOf(lawyer)
  lawyers.splice(index, 1)
  if (!lawyer) {
    res.json({ status: 'error', message: 'Lawyer not found', data: lawyer })
  } else {
    res.json({ lawyers })
  }
})

module.exports = router
