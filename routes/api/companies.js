// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/companyController')
const passport = require('passport')
// Read all Companies (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new Company
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Company given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Company given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Company given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

module.exports = router
