// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/externalEntityController')
const passport = require('passport')
// Read all External Entities (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new External Entity
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Read a specific External Entity given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing External Entity given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific External Entity given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

module.exports = router
