const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

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
  const task = await Task.findOne({ taskId })
  if (!task) {
    return res.status(404).send({ error: 'Book does not exist' })
  } else {
    res.json({ data: task })
  }
  /* if (task) {
    res.json({ data: task })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Task not found',
      data: tasks })
  } */
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
/* router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    handler: Joi.string().required(),
    creationDate: Joi.date().required().iso(),
    deadline: Joi.date().required().iso()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }

    const newTask = new Task(
      value.handler,
      value.creationDate,
      value.deadline
    )success',
      message
    tasks.push(newTask)
    return res.json({
      status: ': `New Task created with id ${newTask.id}`,
      data: newTask
    })
  })
})
*/
// update a task
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findOne({ taskId })
    if (!task) return res.status(404).send({ error: 'Task does not exist' })
    const updatedTask = await Task.updateOne(req.body)
    res.json({ msg: 'Task updated successfully' })
  } catch (error) {
    console.log(error)
  }
})
/* router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No data to update'
    })
  }

  const schema = Joi.object().keys({
    handler: Joi.string(),
    creationDate: Joi.date().iso(),
    deadline: Joi.date().iso()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.details[0].message,
        data: data
      })
    }

    const id = req.params.id
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) {
      return res.status(400).json({
        status: 'error',
        message: 'Error task not found'
      })
    }

    Object.keys(value).forEach(key => {
      if (value[key]) {
        taskToUpdate[key] = value[key]
      }
    })

    return res.json({
      status: 'success',
      message: `Updated task with id ${id}`,
      data: taskToUpdate
    })
  })
})
*/

// Delete a Task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const deletedTask = await Task.findByIdAndRemove(taskId)
  } catch (error) {
    console.log(error)
  }
  /* const taskId = req.params.id
  const task = tasks.find(tasks => tasks.id === taskId)
  const index = tasks.indexOf(task)
  tasks.splice(index, 1)
  res.send(tasks) */
})

module.exports = router
