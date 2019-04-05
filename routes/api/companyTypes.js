// Load modules
const express = require('express')
const router = express.Router()
const companyTypeController = require('../../controllers/companyTypeController')
// Read all company types (Default route)
router.get('/', companyTypeController.getAll)

// Create a new company type
router.post('/', companyTypeController.create)

// Reads a specific Company Type given id in URL
router.get('/:id', companyTypeController.getByID)

// Update an existing Company Type given id in URL
router.put('/:id', companyTypeController.update)

// Delete a specific Company Type given ID in URL
router.delete('/:id', companyTypeController.delete)

module.exports = router
