// Load modules
const express = require('express')
const router = express.Router()

// Task model
const Task = require('../../models/Task')
const validator = require('../../validations/taskValidations')
const TaskControllers = require('../../controllers/taskControllers')

// Read all Tasks (Default route)
router.get('/', TaskControllers.getAll)

// Read specfic department tasks (if given a valid department in the body)
router.put('/viewDepartmentTask', TaskControllers.viewDepartmentTask)

// Read specific task by id
router.get('/:id', TaskControllers.getByID)

// create a task
router.post('/', TaskControllers.createTask)

// update a task
router.put('/:id', TaskControllers.updateTask)

// Delete a Task
router.delete('/:id', TaskControllers.deleteTask)

module.exports = router
