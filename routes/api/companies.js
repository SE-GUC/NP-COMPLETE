// Load modules
const express = require('express')
const router = express.Router()

// Company model and validator
const Company = require('../../models/Company')
const validator = require('../../validations/companyValidations')

const companyControllers = require('../../controllers/companyControllers')

// Read all Companies (Default route)
router.get('/', companyControllers.getAll)
// Create a new Company
router.post('/', companyControllers.create)

// Reads a specific Company given id in URL
router.get('/:id', companyControllers.getByID)

// Update an existing Company given id in URL
router.put('/:id', companyControllers.update)

// Delete a specific Company given ID in URL
router.delete('/:id', companyControllers.delete)

module.exports = router
