// requiring mongoose for id validations
const mongoose = require('mongoose')

exports.default = async (res, Model) => {
  const entities = await Model.find()
  return res.json({
    status: 'Success',
    data: entities
  })
}

exports.create = async (req, res, validator, Model) => {
  const entityName = Model.collection.name
  const data = getBody(req, res)
  if (!data) {
    return
  }

  try {
    const validated = isValidated(res, data, validator.createValidation)
    if (!validated) {
      return
    }

    const newEntity = await Model.create(data)
    return res.json({
      status: 'Success',
      message: `New ${entityName} created with id ${newEntity.id}`,
      data: newEntity
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.read = async (req, res, Model) => {
  const entityId = req.params.id
  const entity = await findById(res, Model, entityId)
  if (!entity) {
    return
  }

  return res.json({
    status: 'Success',
    data: entity
  })
}

exports.update = async (req, res, validator, Model) => {
  const entityName = Model.collection.name
  const data = getBody(req, res)
  if (!data) {
    return
  }

  try {
    const entityId = req.params.id
    const validated = isValidated(res, data, validator.updateValidation)
    if (!validated) {
      return
    }

    const updatedEntity = await findByIdAndUpdate(res, Model, entityId, data)
    if (!updatedEntity) {
      return
    }

    return res.json({
      status: 'Success',
      message: `Updated ${entityName} with id ${entityId}`,
      data: updatedEntity
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

exports.delete = async (req, res, Model) => {
  const entityName = Model.collection.name
  try {
    const entityId = req.params.id
    const deletedEntity = await findByIdAndRemove(res, Model, entityId)
    if (!deletedEntity) {
      return
    }

    return res.json({
      status: 'Success',
      message: `Deleted ${entityName} with id ${entityId}`,
      deleted: deletedEntity,
      remaining: await Model.find()
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

const findById = exports.findById = async (res, Model, entityId) => {
  const entityName = Model.collection.name
  if (!validId(res, Model, entityId)) {
    return false
  }

  const currentEntity = await Model.findById(entityId)
  if (!currentEntity) {
    res.status(400).json({
      status: 'Error',
      message: `Could not find the ${entityName} you are looking for!`
    })
    return false
  }
  return currentEntity
}

const findByIdAndUpdate = exports.findByIdAndUpdate = async (res, Model, entityId, data) => {
  const entityName = Model.collection.name
  const isValidId = validId(res, Model, entityId)
  if (!isValidId) {
    return false
  }

  const query = { '_id': entityId }
  const updatedEntity = await Model.findByIdAndUpdate(query, data, { new: true })
  if (!updatedEntity) {
    res.status(400).json({
      status: 'Error',
      message: `Could not find the ${entityName} you are looking for!`
    })
    return false
  }
  return updatedEntity
}

const findByIdAndRemove = exports.findByIdAndRemove = async (res, Model, entityId) => {
  const entityName = Model.collection.name
  const isValidId = validId(res, Model, entityId)
  if (!isValidId) {
    return false
  }

  const removedEntity = await Model.findByIdAndRemove(entityId)
  if (!removedEntity) {
    res.status(400).json({
      status: 'Error',
      message: `${entityName} not found`,
      available: await Model.find()
    })
    return false
  }
  return removedEntity
}

const getBody = exports.getBody = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'Error',
      message: `Nothing was not entered in body`
    })
    return false
  }
  return req.body
}

const validId = exports.validId = (res, Model, entityId) => {
  const entityName = Model.collection.name
  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    res.status(400).json({
      status: 'Error',
      message: `Not a valid ID for ${entityName}`
    })
    return false
  }
  return true
}

const isValidated = exports.isValidated = (res, data, validationFunction) => {
  const validationResult = validationFunction(data)
  if (validationResult.error) {
    res.status(400).json({
      status: 'Error',
      message: validationResult.error.details[0].message,
      data: data
    })
    return false
  }
  return true
}
