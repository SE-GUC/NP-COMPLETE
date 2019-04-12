const Task = require('../models/Task')
const validator = require('../validations/taskValidations')

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json({ data: tasks })
  } catch (error) {
    console.log(error)
  }
}

exports.viewDepartmentTask = async (req, res) => {
  const department = req.body.department
  // check that the given department in the body is valid
  if (department === 'Lawyer' || department === 'Reviewer' || department === 'Admin' || department === 'External Entity') {
    const query = { 'department': department }
    const task = await Task.find(query)
    // check if there exist such task
    if (!task) {
      return res.status(404).json({
        status: 'Error',
        message: 'Task does not exist'
      })
    }
    // view the tasks of the given depratment
    res.json({
      status: 'Success',
      data: task
    })
  } else {
    // the given department was not valid
    const validDepartment = { Department1: 'Lawyer', Department2: 'Admin', Department3: 'Reviewer', Department4: 'External Entity' }
    return res.status(404).json({
      status: 'Error',
      message: 'There is no such department',
      validDepartments: validDepartment
    })
  }
}

exports.getByID = async (req, res) => {
  const taskId = req.params.id
  const task = await Task.findById(taskId)
  if (!task) {
    return res.status(404).json({
      status: 'Error',
      message: 'Task does not exist'
    })
  }
  res.json({
    status: 'Success',
    data: task
  })
}

exports.create = async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        error: isValidated.error.details[0].message })
    }

    const newTask = await Task.create(req.body)
    res.json({
      status: 'Success',
      message: 'Task was created successfully',
      data: newTask })
  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
  const data = req.body
  const taskId = req.params.id
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: 'Error',
      message: 'No data to update'
    })
  }

  try {
    const isValidated = validator.updateValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const task = await Task.findById(taskId)

    if (!task) {
      return res.status(404).json({
        status: 'Error',
        error: 'Task does not exist'
      })
    }
    const query = { '_id': taskId }
    const updatedTask = await Task.findOneAndUpdate(query, data, { new: true })

    res.json({
      status: 'Success',
      message: `Updated Task with id ${taskId}`,
      data: updatedTask
    })
  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res) => {
  try {
    const taskId = req.params.id
    const taskToDelete = await Task.findByIdAndRemove(taskId)
    if (!taskToDelete) {
      return res.status(400).json({
        status: 'Error',
        message: `Task not found`,
        availableTasks: await Task.find()
      })
    }
    res.json({
      status: 'Success',
      message: `Deleted task with id ${taskId}`,
      deletedTask: taskToDelete,
      remainingTask: await Task.find()
    })
  } catch (error) {
    console.log(error)
  }
}