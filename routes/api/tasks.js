const express = require('express')
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

// Delete a Task
router.delete('/:id', (req, res) => {
  const taskId = req.params.id
  const task = tasks.find(tasks => tasks.id === taskId)
  const index = tasks.indexOf(task)
  tasks.splice(index, 1)
  res.send(tasks)
})

module.exports = router
