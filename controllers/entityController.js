// requiring mongoose for id validations
const mongoose = require('mongoose')
exports.default = async (res, Model) => {
  const entities = await Model.find()
  res.json({
    status: 'Success',
    data: entities })
}

exports.create = async (req, res, validator, Model) => {
  const entityName = Model.collection.name
  const data = req.body
  try {
    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
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
  const entityName = Model.collection.name
  const entityId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    return res.status(400).json({
      status: 'Error',
      message: 'not a valid ID'
    })
  }
  const entity = await Model.findById(entityId)
  if (!entity) {
    return res.status(400).json({
      status: 'Error',
      message: `${entityName} not found`,
      available: await Model.find()
    })
  }
  res.json({ data: entity })
}

exports.update = async (req, res, validator, Model) => {
  const entityName = Model.collection.name
  var data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const entityId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(entityId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    // const entityToUpdate = await Model.findById(entityId)

    // if (!entityToUpdate) {
    //   return res.status(400).json({
    //     status: 'Error',
    //     message: `${entityName} not found`,
    //     available: await Model.find()
    //   })
    // }

    const isValidated = validator.updateValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }

    const query = { '_id': entityId }
    const updatedEntity = await Model.findByIdAndUpdate(query, data, { new: true })
    data = updatedEntity.body
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
    if (!mongoose.Types.ObjectId.isValid(entityId)) {
      return res.status(400).json({
        status: 'Error',
        message: 'not a valid ID'
      })
    }
    const deletedEntity = await Model.findByIdAndRemove(entityId)

    if (!deletedEntity) {
      return res.status(400).json({
        status: 'Error',
        message: `${entityName} not found`,
        available: await Model.find()
      })
    }

    res.json({
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

exports.has = async (res, Model, id) => {
  const entityName = Model.collection.name
  const currentEntity = await Model.findById(id)
  if (!currentEntity) {
    res.status(100).json({
      status: 'Error',
      message: `Could not find the ${entityName} you are looking for!`
    })
    return false
  }
  return true
}

exports.find = async (res, Model, query) => {
  const entityName = Model.collection.name
  const currentEntity = await Model.find(query)
  if (!currentEntity) {
    res.status(100).json({
      status: 'Error',
      message: `Could not find the ${entityName} you are looking for!`
    })
    return false
  }
  return true
}
