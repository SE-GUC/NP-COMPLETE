// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/companyTypeController')
// Read all company types (Default route)
router.get('/', controller.default)

// Create a new company type
router.post('/', controller.create)

// Reads a specific Company Type given id in URL
router.get('/:id', controller.read)

// Update an existing Company Type given id in URL
router.put('/:id', controller.update)

// Delete a specific Company Type given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
