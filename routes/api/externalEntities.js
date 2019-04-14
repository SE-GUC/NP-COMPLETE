// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/externalEntityController')

// Read all External Entities (Default route)
router.get('/', controller.default)

// Create a new External Entity
router.post('/', controller.create)

// Read a specific External Entity given id in URL
router.get('/:id', controller.read)

// Update an existing External Entity given id in URL
router.put('/:id', controller.update)

// Delete a specific External Entity given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
