// Load modules
const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Task model
const Task = require('../../models/Task')

// Temporary data created (acts as a mock database)
const tasks = [
  new Task('Mohamed Hosam', '1998-01-22', '2019-01-01'),
  new Task('Yasser', '1998-06-05', '2018-05-03')
]

// Read all Tasks (Default route)
router.get('/', (req, res) => res.json({ data: tasks }))

// Create a new Task
router.post('/', (req, res) => {
  const data = req.body
  const schema = Joi.object().keys({
    handler: Joi.string().required(),
    creationDate: Joi.date().required().iso().required(),
    deadline: Joi.date().required().iso()
  })

  Joi.validate(data, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const newTask = new Task(
      value.handler,
      value.creationDate,
      value.deadline
    )
    tasks.push(newTask)
    return res.json({
      status: 'Success',
      message: `New Task created with id ${newTask.id}`,
      data: newTask
    })
  })
})

// Read specific Task given id in URL
router.get('/:id', (req, res) => {
  const taskId = req.params.id
  const task = tasks.find(task => task.id === taskId)
  if (task) {
    res.json({ data: task })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Task not found',
      availableTasks: tasks
    })
  }
})

// Update an existing Task given id in URL
router.put('/:id', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
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
        status: 'Error',
        message: err.details[0].message,
        data: data
      })
    }

    const id = req.params.id
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) {
      return res.status(400).json({
        status: 'Error',
        message: 'Task not found'
      })
    }

    Object.keys(value).forEach(key => {
      if (value[key]) {
        taskToUpdate[key] = value[key]
      }
    })

    return res.json({
      status: 'Success',
      message: `Updated task with id ${id}`,
      data: taskToUpdate
    })
  })
})

// Delete a specific Task given ID in URL
router.delete('/:id', (req, res) => {
  const taskId = req.params.id
  const task = tasks.find(tasks => tasks.id === taskId)
  if (task) {
    const index = tasks.indexOf(task)
    tasks.splice(index, 1)
    res.json({
      status: 'Success',
      message: `Deleted task with id ${taskId}`,
      remainingTasks: tasks
    })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Task not found',
      availableTasks: tasks
    })
  }
})

module.exports = router
