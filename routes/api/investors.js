// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Investor model
const Investor = require('../../models/Investor')

// Temporary data created (acts as a mock database)
const investors = [
  new Investor('Mohamed Ayman', '1998-10-16', 20, 'mohamedAyman@gmail.com'),
  new Investor('Mohamed Farid', '1998-12-18', 20, 'mohamedFarid@hotmail.com'),
  new Investor('Bill Marks', '1990-05-21', 28, 'billMarks@outlook.com')
]

// Read all Investors (Default route)
router.get('/', (req, res) => res.json({ data: investors }))

// Create a new Investor
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    fullName: Joi.string().min(3).max(80).required(),
    birthdate: Joi.date().iso().max(Date.now()).required(),
    email: Joi.string().email().required()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newInvestor = new Investor(
      value.fullName,
      value.birthdate,
      value.email
    )
    investors.push(newInvestor)
    return res.json({
      status: 'Success',
      message: `New investor created with id ${newInvestor.id}`,
      data: newInvestor
    })
  })
})

// Reads a specific Investor given id in URL
router.get('/:id', (req, res) => {
  const investorId = req.params.id
  const investor = investors.find(investor => investor.id === investorId)
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
    email: Joi.string().email()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const investorId = req.params.id
    const investorToUpdate = investors.find(investor => investor.id === investorId)

    if (!investorToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Investor not found'
      })
    }

    Object.keys(value).forEach(key => {
      if (value[key]) {
        investorToUpdate[key] = value[key]
      }
    })

    return res.json({
      status: 'Success',
      message: `Updated investor with id ${investorId}`,
      data: investorToUpdate
    })
  })
})

// Delete a specific Investor given ID in URL
router.delete('/:id', (req, res) => {
  const investorId = req.params.id
  const investor = investors.find(investor => investor.id === investorId)
  if (investor) {
    const index = investors.indexOf(investor)
    investors.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted investor with id ${investorId}`,
      remainingInvestors: investors
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Investor not found',
      availableInvestors: investors
    })
  }
})

module.exports = router
