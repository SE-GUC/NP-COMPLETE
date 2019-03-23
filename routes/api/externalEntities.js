// Load modules
const express = require('express')
const router = express.Router()

// ExternalEntity model and validator
const ExternalEntity = require('../../models/ExternalEntity')
const validator = require('../../validations/externalEntitiesValidation')

// Read all External Entities (Default route)
router.get('/', async (req, res) => {
  const externalEntities = await ExternalEntity.find()
  res.json({
    status: 'Success',
    data: externalEntities })
})

// Create a new External Entity
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const newExternalEntity = await ExternalEntity.create(req.body)
    return res.json({
      status: 'Success',
      message: `New external entity created with id ${newExternalEntity.id}`,
      data: newExternalEntity
    })
  } catch (error) {
    console.log(error)
  }
})

// Read a specific External Entity given id in URL
router.get('/:id', async (req, res) => {
  const externalEntityId = req.params.id
  const externalEntity = await ExternalEntity.findById(externalEntityId)
  if (externalEntity) {
    res.json({
      status: 'Success',
      data: externalEntity })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'External entity not found'
    })
  }
})

// Update an existing External Entity given id in URL
router.put('/:id', async (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const id = req.params.id
    const externalEntity = await ExternalEntity.findById(id)
    if (!externalEntity) {
      return res.status(404).json({
        status: 'Error',
        message: 'External entity does not exist'
      })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const query = { '_id': id }
    const updatedExternalEntity = await ExternalEntity.findOneAndUpdate(query, req.body, { new: true })
    return res.json({
      status: 'Success',
      message: `Updated external entity with id ${id}`,
      data: updatedExternalEntity
    })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific External Entity given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedExternalEntity = await ExternalEntity.findByIdAndRemove(id)
    if (!deletedExternalEntity) {
      return res.status(400).json({
        status: 'Error',
        Message: 'External Entity not found'
      })
    }

    res.json({
      status: 'Success',
      message: `Deleted external entity with id ${id}`,
      deletedRecord: deletedExternalEntity
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
