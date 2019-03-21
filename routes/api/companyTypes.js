// Load modules
const express = require('express')
const router = express.Router()

// Admin model
const CompanyType = require('../../models/CompanyType')

// Read all company types (Default route)
router.get('/', async (req, res) => {
  const companyTypes = await CompanyType.find()
  res.json({ data: companyTypes })
})

// Create a new company type
router.post('/', async (req, res) => {
  const data = req.body

  try {
    //! Are try-catch blocks needed? Do we need it to cover all?
    // const isValidated = validator.createValidation(data)
    // if (isValidated.error) {
    //   return res.status(400).json({
    //     status: 'Error',
    //     message: isValidated.error.details[0].message,
    //     data: data
    //   })
    // }

    const newCompanyType = await CompanyType.create(data)
    return res.json({
      status: 'Success',
      message: `New company type created with id ${newCompanyType.id}`,
      data: newCompanyType
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
