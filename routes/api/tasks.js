// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/taskController')

// Read all Tasks (Default route)
router.get('/', controller.default)

// Create a new Task
router.post('/', controller.create)

// Reads a specific Task given id in URL
router.get('/:id', controller.read)

// Update an existing Task given id in URL
router.put('/:id', controller.update)

//  Delete a specific Task given ID in URL
router.delete('/:id', controller.delete)

// Read specfic department tasks (if given a valid department in the body)
router.put('/viewDepartmentTask', controller.viewDepartmentTask)

module.exports = router
