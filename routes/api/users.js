// Load modules
const express = require('express')
const router = express.Router()

const Company = require('../../models/Company')

router.get('/showEstablishedCompanies', async (req, res) => {
  const companies = await Company.find({ 'state': 'Established' }, { 'name': 1, 'type': 1, 'establishmentDate': 1 })
  res.json({ data: companies })
})
module.exports = router
