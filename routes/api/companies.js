// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/companyController')

// Read all Companies (Default route)
router.get('/', controller.default)

// Create a new Company
router.post('/', controller.create)

// Reads a specific Company given id in URL
router.get('/:id', controller.read)

// Update an existing Company given id in URL
router.put('/:id', controller.update)

// Delete a specific Company given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
