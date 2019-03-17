// Load modules
const express = require('express')
const router = express.Router()

// Task model
const Task = require('../../models/Task')
const validator = require('../../validations/taskValidations')

// Read all Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.json({ data: tasks })
})

// Read specific task
router.get('/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    return res.status(404).send({ error: 'Task does not exist' })
  } else {
    res.json({ data: task })
  }
})

// create a task
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newTask = await Task.create(req.body)
    res.json({ msg: 'Task was created successfully', data: newTask })
  } catch (error) {
    console.log(error)
  }
})

// update a task
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId })
    if (!task) return res.status(404).send({ error: 'Task does not exist' })
    await Task.updateOne(req.body)
    res.json({ msg: 'Task updated successfully' })
  } catch (error) {
    console.log(error)
  }
})

// Delete a Task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    await Task.findByIdAndRemove({ _id: taskId })
    res.json({ msg: 'Task deleted successfully' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
