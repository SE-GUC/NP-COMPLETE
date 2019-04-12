// Entity model and validator
const Model = require('../models/ExternalEntity')
const validator = require('../validations/externalEntityValidations')
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
