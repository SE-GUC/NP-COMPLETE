// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Company model
const Company = require('../../models/Company')

// Temporary data created (acts as a mock database)
const companies = [
  new Company('BMW', 'SSC', '2000-05-16'),
  new Company('NIKE', 'SSC', '1990-12-20'),
  new Company('PUMA', 'SSC', '2008-08-19')
]

// Read all Companies (Default route)
router.get('/', (req, res) => res.json({ data: companies }))

// Create a new Company
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    establishmentDate: Joi.date().iso().required()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newCompany = new Company(
      value.name,
      value.type,
      value.establishmentDate
    )
    companies.push(newCompany)
    return res.json({
      status: 'Success',
      message: `New company created with id ${newCompany.id}`,
      data: newCompany
    })
  })
})

// Reads a specific Company given id in URL
router.get('/:id', (req, res) => {
  const companyId = req.params.id
  const company = companies.find(company => company.id === companyId)
  if (company) {
    res.json({ data: company })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Company not found',
      data: companies
    })
  }
})

// Update an existing Company given id in URL
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  const schema = Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    establishmentDate: Joi.date().iso()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const companyId = req.params.id
    const companyToUpdate = companies.find(company => company.id === companyId)

    if (!companyToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company not found'
      })
    }

    let x = 0
    Object.keys(value).forEach(key => {
      if (value[key]) {
        companyToUpdate[key] = value[key]
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
      message: `Updated company with id ${companyId}`,
      data: companyToUpdate
    })
  })
})

// Delete a specific Company given ID in URL
router.delete('/:id', (req, res) => {
  const companyId = req.params.id
  const company = companies.find(company => company.id === companyId)
  if (!company) {
    const index = companies.indexOf(company)
    companies.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted company with id ${companyId}`,
      remainingCompanies: companies
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Company not found',
      availableCompanies: companies
    })
  }
})

module.exports = router
