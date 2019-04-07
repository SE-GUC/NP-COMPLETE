// Load modules
const express = require('express')
const router = express.Router()

const TaskControllers = require('../../controllers/taskControllers')

// Read all Tasks (Default route)
router.get('/', TaskControllers.getAll)

// Read specfic department tasks (if given a valid department in the body)
router.put('/viewDepartmentTask', TaskControllers.viewDepartmentTask)

// Read specific task by id
router.get('/:id', TaskControllers.getByID)

// create a task
router.post('/', TaskControllers.create)

// update a task
router.put('/:id', TaskControllers.update)

// Delete a Task
router.delete('/:id', TaskControllers.delete)

module.exports = router
