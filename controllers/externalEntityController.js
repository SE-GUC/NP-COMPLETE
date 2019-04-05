// ExternalEntity model and validator
const ExternalEntity = require('../models/ExternalEntity')
const validator = require('../validations/externalEntitiesValidation')

exports.getAll = async (req, res) => {
  const externalEntities = await ExternalEntity.find()
  res.json({
    status: 'Success',
    data: externalEntities })
}

exports.create = async (req, res) => {
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
}

exports.getByID = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
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
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const ExternalEntityToBeDeleted = await ExternalEntity.findByIdAndRemove(id)
    const AllExternalEntities = await ExternalEntity.find()
    if (!ExternalEntityToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        Message: 'External Entity not found',
        availableExternalEntities: AllExternalEntities
      })
    }

    res.json({
      status: 'Success',
      message: `Deleted external entity with id ${id}`,
      deletedExternalEntity: ExternalEntityToBeDeleted,
      remainingExternalEntities: AllExternalEntities
    })
  } catch (error) {
    console.log(error)
  }
}
