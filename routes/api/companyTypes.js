// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/companyTypeController')
const passport = require('passport')
// Read all company types (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new company type
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Company Type given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Company Type given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Company Type given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

module.exports = router
