// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Lawyer models
const Lawyer = require('../../models/Lawyer')

// Temporary data created (acts as a mock database)
const lawyers = [
  new Lawyer('Barney', '2000-05-5', 'burney@gmail.com'),
  new Lawyer('Ahmed', '1990-05-5', 'ahmed@gmail.com'),
  new Lawyer('Mariam', '1995-1-1', 'mariam@gmail.com', '2005-5-5', 8, 5000)
]

// Read all Lawyers (Default route)
router.get('/', (req, res) => res.json({ data: lawyers }))

// Create a new Lawyer
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80).required(),
    birthdate: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    startDate: Joi.date().iso().required(),
    workingHours: Joi.number().min(5),
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

    const newLawyer = new Lawyer(
      value.fullName,
      value.birthdate,
      value.email,
      value.startDate,
      value.workingHours,
      value.salary
    )
    lawyers.push(newLawyer)
    return res.json({
      status: 'Success',
      message: `New lawyer created with id ${newLawyer.id}`,
      data: newLawyer
    })
  })
})

// Reads a specific Lawyer given id in URL
router.get('/:id', (req, res) => {
  const lawyerId = req.params.id
  const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
  if (lawyer) {
    res.json({ data: lawyer })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Lawyer not found',
      data: lawyers
    })
  }
})

// Update an existing Lawyer given id in URL
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
    birthdate: Joi.date().iso(),
    email: Joi.string().email(),
    startDate: Joi.date().iso(),
    workingHours: Joi.number().min(5),
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

    const lawyerId = req.params.id
    const lawyerToUpdate = lawyers.find(lawyer => lawyer.id === lawyerId)

    if (!lawyerToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Lawyer not found'
      })
    }

    let x = 0
    Object.keys(value).forEach(key => {
      if (value[key]) {
        lawyerToUpdate[key] = value[key]
        x++
      }
    })
    if (x === 0) {
      return res.status(400).send({
        status: 'Error',
        message: 'Wrong data was sent',
        data: data
      })
    }

    return res.json({
      status: 'Success',
      message: `Updated lawyer with id ${lawyerId}`,
      data: lawyerToUpdate
    })
  })
})

// Delete a specific Lawyer given ID in URL

router.delete('/:id', (req, res) => {
  const lawyerId = req.params.id
  const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
  if (lawyer) {
    const index = lawyers.indexOf(lawyer)
    lawyers.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted lawyer with id ${lawyerId}`,
      remainingLwayers: lawyers
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Lwayer not found',
      availableLawyers: lawyers
    })
  }
})

module.exports = router
