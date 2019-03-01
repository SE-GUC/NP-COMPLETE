// Dependancies
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Investor model
const Investor = require('../../models/Investor')

// Temporary data created as if it was pulled out of the database
const investors = [
  new Investor('Mohamed Ayman', '1998-10-16', 20, 'mohamedAyman@gmail.com'),
  new Investor('Mohamed Farid', '1998-12-18', 20, 'mohamedFarid@hotmail.com'),
  new Investor('Bill Marks', '1990-05-21', 28, 'billMarks@outlook.com')
]

// Default route ..returns all Investors in the array.
router.get('/', (req, res) => res.json({ data: investors }))

// Create a new Investor
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({

    fullName: Joi.string().min(4).required(),
    birthDate: Joi.date().required().iso(),
    email: Joi.string().email().required()

  })

  Joi.validate(data, schema, (error, value) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        data: data
      })
    }
    const newInvestor = new Investor(value.fullName, value.birthDate, value.email)
    investors.push(newInvestor)
    return res.json({
      status: 'success',
      message: `New Investor created with id ${newInvestor.id}`,
      data: newInvestor
    })
  })
})

// Reads a specific Investor given id in URL.
router.get('/:id', (req, res) => {
  const investorId = req.params.id
  const investor = investors.find(investor => investor.id === investorId)
  if (investor) {
    res.json({ data: investor })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Investor not found',
      data: investors })
  }
})

// Update an existing Investor with joi validation
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) { return res.status(400).json({ status: 'error', message: 'No data to update' }) }

  const schema = Joi.object().keys({

    fullName: Joi.string().min(4),
    birthDate: Joi.date().iso(),
    email: Joi.string().email()
  })

  Joi.validate(data, schema, (error, value) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
        data: data
      })
    }

    const id = req.params.id
    const investorToBeUpdated = investors.find(Investor => Investor.id === id)

    if (!investorToBeUpdated) { res.status(400).json({ status: 'error', message: 'No investor was found with this ID' }) }

    Object.keys(value).forEach(key => {
      if (value[key]) {
        investorToBeUpdated[key] = value[key]
      }
    })

    return res.json({
      status: 'success',
      message: `Updated investor with id ${id}`,
      data: investorToBeUpdated
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
    res.json({ data: investors })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Investor not found',
      data: investors })
  }
})

//! Error route needed
router.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

module.exports = router
