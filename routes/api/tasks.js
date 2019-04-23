// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/taskController')
const passport = require('passport')
// Read specfic department tasks (if given a valid department in the body)
router.put('/viewDepartmentTask', controller.viewDepartmentTask)

// Read all Tasks (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new Task
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Task given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Task given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

//  Delete a specific Task given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

module.exports = router
