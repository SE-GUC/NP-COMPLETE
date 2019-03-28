// Load modules
const express = require('express')
const router = express.Router()

const Company = require('../../models/Company')

router.get('/showEstanlishedCompanies', async (req, res) => {
  const companies = await Company.find({ 'state': 'established' }, { '_id': 0, 'name': 1, 'type': 1, 'establishmentDate': 1 })
  res.json({ data: companies })
})
module.exports = router
