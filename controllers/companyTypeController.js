// Entity model and validator
const Model = require('../models/CompanyType')
const validator = require('../validations/companyTypeValidations')
const entityController = require('./entityController')

exports.default = async (req, res) => {
  await entityController.default(res, Model)
}

exports.create = async (req, res) => {
  await entityController.create(req, res, validator, Model)
}

exports.read = async (req, res) => {
  await entityController.read(req, res, Model)
}

exports.update = async (req, res) => {
  await entityController.update(req, res, validator, Model)
}

exports.delete = async (req, res) => {
  await entityController.delete(req, res, Model)
}
