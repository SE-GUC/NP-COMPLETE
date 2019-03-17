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
    creationDate: Joi.date().iso().required(),
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
    const task = await Task.findOne({ _id: taskId })
    if (!task) return res.status(404).send({ error: 'Task does not exist' })
    await Task.updateOne(req.body)
    res.json({ msg: 'Task updated successfully' })
  } catch (error) {
    console.log(error)
  }
})
/* router.put('/:id', (req, res) => {
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
        message: 'Task not found',
        availableTasks: tasks
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
*/

// Delete a Task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    await Task.findByIdAndRemove({ _id: taskId })
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
