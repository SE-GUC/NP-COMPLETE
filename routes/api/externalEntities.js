// Load modules
const express = require('express')
const router = express.Router()

const externalEntityController = require('../../controllers/externalEntityController')

// Read all External Entities (Default route)
router.get('/', externalEntityController.getAll)

// Create a new External Entity
router.post('/', externalEntityController.create)

// Read a specific External Entity given id in URL
router.get('/:id', externalEntityController.getByID)

// Update an existing External Entity given id in URL
router.put('/:id', externalEntityController.update)

// Delete a specific External Entity given ID in URL
router.delete('/:id', externalEntityController.delete)

module.exports = router
