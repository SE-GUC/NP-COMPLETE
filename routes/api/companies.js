// Dependencies
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Models
const Company = require('../../models/Company')
// temporary database
const companies = [
  new Company('BMW', 'SSC', '2000-05-16'),
  new Company('NIKE', 'SSC', '1990-12-20'),
  new Company('PUMA', 'SSC', '2008-08-19')
]
// read all companies
router.get('/', (req, res) => res.json({ data: companies }))

// Read specific company
router.get('/:id', (req, res) => {
  const companyId = req.params.id
  const company = companies.find(company => company.id === companyId)
  if (company) {
    res.json({ data: company })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Company not found',
      data: companies })
  }
})

// create a company
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
        status: 'error',
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
      status: 'success',
      message: `New Company created with id ${newCompany.id}`,
      data: newCompany
    })
  })
})
// update a company
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'error',
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
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }
    const companyId = req.params.id
    console.log(companyId)
    const companyToUpdate = companies.find(company => company.id === companyId)

    if (!companyToUpdate) {
      return res.status(400).json({
        status: 'error',
        message: 'Error company not found'
      })
    }
    Object.keys(value).forEach(key => {
      if (value[key]) {
        companyToUpdate[key] = value[key]
      }
    })

    return res.json({
      status: 'success',
      message: `Updated admin with id ${companyId}`,
      data: companyToUpdate
    })
  })
})

// delete company
router.delete('/:id', (req, res) => {
  const companyId = req.params.id
  const company = companies.find(company => company.id === companyId)
  if (!company) {
    return res.status(400).json({ status: 'error',
      message: 'Company not found',
      availableCompanies: companies })
  }
  const index = companies.indexOf(company)
  companies.splice(index, 1)
  res.json({ status: 'success',
    message: `Deleted company with id ${companyId} successfully`,
    remainingCompanies: companies
  })
})

module.exports = router
