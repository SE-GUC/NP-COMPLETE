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
// get all companies
router.get('/', (req, res) => res.json({ data: companies }))

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
// update a lawyer
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
module.exports = router
