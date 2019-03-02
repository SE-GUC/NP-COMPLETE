// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// ExternalEntity model
const ExternalEntity = require('../../models/ExternalEntity')

// Temporary data created (acts as a mock database)
const externalEntities = [
  new ExternalEntity('Taxes', '@1', 1122),
  new ExternalEntity('Insurance', '@11', 221100),
  new ExternalEntity('Defense', '@111', 123),
  new ExternalEntity('Security', '@1111', 112200)
]

// Read all External Entities (Default route)
router.get('/', (req, res) => res.json({ data: externalEntities }))

// Create a new External Entity
router.post('/', (req, res) => {
  const data = req.body
  const schema = {
    fullName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required()
  }

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newExternalEntity = new ExternalEntity(
      value.fullName,
      value.email,
      value.phone
    )
    externalEntities.push(newExternalEntity)
    return res.json({
      status: 'Success',
      message: `New external entity created with id ${newExternalEntity.id}`,
      data: newExternalEntity
    })
  })
})

// Read a specific External Entity given id in URL
router.get('/:id', (req, res) => {
  const externalEntityId = req.params.id
  const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
  if (externalEntity) {
    res.json({ data: externalEntity })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'External entity not found',
      data: externalEntities
    })
  }
})

// Update an existing External Entity given id in URL
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  const schema = {
    fullName: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.number()
  }

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const externalEntityId = req.params.id
    const externalEntityToUpdate = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)

    if (!externalEntityToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'External entity not found'
      })
    }

    let x = 0
    Object.keys(value).forEach(key => {
      if (value[key]) {
        externalEntityToUpdate[key] = value[key]
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
      message: `Updated external entity with id ${externalEntityId}`,
      data: externalEntityToUpdate
    })
  })
})

// Delete a specific External Entity given ID in URL
router.delete('/:id', (req, res) => {
  const externalEntityId = req.params.id
  const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
  if (externalEntity) {
    const index = externalEntities.indexOf(externalEntity)
    externalEntities.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted external entity with id ${externalEntityId}`,
      remainingExternalEntities: externalEntities
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'External entity not found',
      availableExternalEntities: externalEntities
    })
  }
})

module.exports = router
