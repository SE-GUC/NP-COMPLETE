// Entity model and validator
const Model = require('../models/Task')
const validator = require('../validations/taskValidations')
const main = require('./main')

exports.default = async (req, res) => {
  await main.default(res, Model)
}

exports.create = async (req, res) => {
  await main.create(req, res, validator, Model)
}

exports.read = async (req, res) => {
  await main.read(req, res, Model)
}

exports.update = async (req, res) => {
  await main.update(req, res, validator, Model)
}

exports.delete = async (req, res) => {
  await main.delete(req, res, Model)
}

exports.viewDepartmentTask = async (req, res) => {
  const department = req.body.department
  // check that the given department in the body is valid
  if (department === 'Lawyer' || department === 'Reviewer' || department === 'Admin' || department === 'External Entity') {
    const query = { 'department': department }
    const tasks = await Model.find(query)
    // check if there exist such task
    if (!tasks.length) {
      return res.status(404).json({
        status: 'Error',
        message: 'Task does not exist'
      })
    }
    // view the tasks of the given depratment
    res.json({
      status: 'Success',
      data: tasks
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
