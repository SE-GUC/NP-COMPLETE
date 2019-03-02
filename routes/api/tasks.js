const express = require('express')
const Joi = require('joi')
const router = express.Router()

// Task model
const Task = require('../../models/Task')

// temporary data (to act as a mock database)
const tasks = [
  new Task('Mohamed Hosam', '1998-01-22', '2019-01-01'),
  new Task('Yasser', '1998-06-05', '2018-05-03')
]

// Read all Tasks
router.get('/', (req, res) => res.json({ data: tasks }))

// Read specific task
router.get('/:id', (req, res) => {
  const taskId = req.params.id
  const task = tasks.find(tasks => tasks.id === taskId)
  if (task) {
    res.json({ data: task })
  } else {
    res.status(400).json({ status: 'error',
      message: 'Task not found',
      data: tasks })
  }
})

// create a task
router.post('/', (req, res) => {
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
    )
    tasks.push(newTask)
    return res.json({
      status: 'success',
      message: `New Task created with id ${newTask.id}`,
      data: newTask
    })
  })
})

// update a task
router.put('/:id', (req, res) => {
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

// Delete a Task
router.delete('/:id', (req, res) => {
  const taskId = req.params.id
  const task = tasks.find(tasks => tasks.id === taskId)
  const index = tasks.indexOf(task)
  tasks.splice(index, 1)
  res.send(tasks)
})

module.exports = router
