const uuidv4 = require('uuid/v4')
const express = require('express')
const Joi = require('joi')
// const bodyParser=require('body-parser');
const ExternalEntity = require('../../models/ExternalEntity')
const router = express.Router()

// router.use(bodyParser.urlencoded({extended:true}))

const externalEntities = [
  new ExternalEntity('Taxes', '@1', 1122),
  new ExternalEntity('Insurance', '@11', 221100),
  new ExternalEntity('Defense', '@111', 123),
  new ExternalEntity('Security', '@1111', 112200)
]
// Reading all external entities
router.get('/', (req, res) => res.json({ data: externalEntities }))

// Read a specific external entity
router.get('/:id', (req, res) => {
  const externalEntityId = req.params.id
  const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
  res.json({ data: externalEntity })
})

// Deleting an entity
router.delete('/:id', (req, res) => {
  const externalEntityId = req.params.id
  const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
  if (externalEntity) {
    const index = externalEntities.indexOf(externalEntity)
    externalEntities.splice(index, 1)
    res.json(externalEntities)
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Sorry, This External Entity does not exist!',
      availableExternalEntities: externalEntities

    })
  }
})

// router.get('/', (req, res) => res.json({ data: externalEntities }))

// Create a new external entity
router.post('/', (req, res) => {
  const fullName = req.body.fullName
  const email = req.body.email
  const phone = req.body.phone

  const schema = {
    fullName: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.number().required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    return res.status(400).send({ error: result.error.details[0].message })
  }
  const newExternalEntity = {
    id: uuidv4(),
    fullName,
    email,
    phone
  }

  externalEntities.push(newExternalEntity)

  return res.json({ status: 'success',
    message: `New External Entity created with id ${newExternalEntity.id}`,
    data: newExternalEntity })
})

// Update a external entity's name,phone & email
router.put('/:id', (req, res) => {
  const id = req.params.id
  const fullName = req.body.fullName
  const email = req.body.email
  const phone = req.body.phone
  const externalEntity = externalEntities.find(ExternalEntity => ExternalEntity.id === id)

  const schema = {
    fullName: Joi.string().min(3),
    email: Joi.string(),
    phone: Joi.number()
  }
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    return res.status(400).send({ error: result.error.details[0].message })
  }
  const newExternalEntity = {
    id,
    fullName,
    email,
    phone
  }
  var x = 0

  Object.keys(externalEntity).forEach(function (key) {
    if (newExternalEntity[key]) {
      x++
      externalEntity[key] = newExternalEntity[key]
    }
  })
  if (x === 1) {
    return res.status(400).send({ error: 'el body fady ya ahbal' })
  } else {
    return res.json({ status: 'success',
      message: `Updated External Entity with id ${newExternalEntity.id}`,
      data: newExternalEntity })
  }
})

module.exports = router
