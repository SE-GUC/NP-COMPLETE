// Load modules
const express = require('express')
const router = express.Router()

// Investor model and validator
const Investor = require('../../models/Investor')
const Company = require('../../models/Company')
const validator = require('../../validations/investorValidations')
const companyType = require('../../models/CompanyType')
const companyValidator = require('../../validations/companyValidations')

// Read all Investors (Default route)
router.get('/', async (req, res) => {
  const investors = await Investor.find()
  res.json({ data: investors })
})
// Create a new Investor
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const newInvestor = await Investor.create(req.body)
    return res.json({
      status: 'Success',
      message: `New investor created with id ${newInvestor.id}`,
      data: newInvestor
    })
  } catch (error) {
    console.log('error')
  }
})

// Reads a specific Investor given id in URL
router.get('/:id', async (req, res) => {
  const investorId = req.params.id
  const investor = await Investor.findById(investorId)
  if (investor) {
    res.json({ data: investor })
  } else {
    res.status(400).json({
      status: 'Error',
      message: 'Investor not found',
      availableInvestors: Investor
    })
  }
})

// Update an existing Investor given id in URL
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const currentInvestor = await Investor.findById(id)
    if (!currentInvestor) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Investor you are looking for',
        availableInvestors: Investor
      })
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const query = { '_id': id }
    const updatedInvestor = await Investor.findByIdAndUpdate(query, req.body)

    return res.json({
      status: 'Success',
      message: `Updated investor successfully`,
      data: updatedInvestor
    })
  } catch (error) {
    console.log('error')
  }
})

// Delete a specific Investor given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const investorToBeDeleted = await Investor.findByIdAndRemove(id)
    const AllInvestors = await Investor.find()
    if (!investorToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Investor you are looking for',
        availableInvestors: AllInvestors
      })
    }
    return res.json({
      status: 'Success',
      message: `Deleted investor with id ${id}`,
      deletedInvestor: investorToBeDeleted,
      remainingInvestors: AllInvestors
    })
  } catch (error) {
    console.log(error)
  }
})

// as an investor i should be able to update forms rejected by the lawyer
router.put('/editForm/:id', async (req, res) => {
  try {
    const companyId = req.params.id
    const companyToBeUpdated = await Company.findById(companyId)
    if (!companyToBeUpdated) {
      return res.status(400).json({
        status: 'Error',
        message: 'could not find Form you are looking for'
      })
    }
    if (companyToBeUpdated.form.filledByLawyer === true || companyToBeUpdated.form.acceptedByLawyer === 1) {
      return res.status(400).json({
        status: 'error',
        message: 'can not update a from that has been filled or accepted by a lawyer'
      })
    }
    const isValidated = validator.editFormValidation(req.body)
    if (isValidated.error) { // we need to add more checks depending on company type
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    companyToBeUpdated.form.data = req.body.data
    const query = { '_id': companyId }
    const updatedCompany = await Company.findOneAndUpdate(query, companyToBeUpdated)
    return res.json({
      status: 'Success',
      message: `Edited Form of Company with id ${companyId}`,
      updatedCompany: updatedCompany
    })
  } catch (error) {
    console.log(error)
  }
})

// As an investor I should be able to keep track of my application, so that I can see which state my application is at.
router.get('/trackApplication/:id', async (req, res) => {
  const id = req.params.id
  Company
    .find({
      investorId: id
    })
    .then(result => res.json({
      status: 'Success',
      message: `Companies for investor ${id}`,
      companies: result
    }))
    .catch(err => {
      console.error(err)
    })
})
// As an investor I should be able to view a list of my current or pending companies, so that I can access their details.
router.get('/getCompanies/:id', async (req, res) => {
  try {
    const investorId = req.params.id
    const query = { 'investorId': investorId }
    const companies = await Company.find(query)
    return res.json({
      status: 'Success',
      message: `companies`,
      data: companies
    })
  } catch (error) {
    console.log('error')
  }
})
// As an investor I should be able to fill an application form, so that I can establish a company.
router.post('/fillForm/:id', async (req, res) => {
  try {
    const isValidated = companyValidator.createValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }
    const type = req.body.type
    const query = { 'companyType': type }
    const companyTypeTemp = await companyType.find(query)
    const fieldsTemp = companyTypeTemp[0].fields
    const dataTypesArray = companyTypeTemp[0].types
    const data = req.body.form.data
    for (let i = 0; i < dataTypesArray.length; i++) {
      const dataType = typeof (data[i])
      if (!(dataType === dataTypesArray[i])) {
        if (!(dataTypesArray[i] === 'date' && isValidDate(data[i]))) {
          return res.status(400).json({
            status: 'Error',
            message: 'wrong data type: ' + fieldsTemp[i] + ' should be ' + dataTypesArray[i]
          })
        }
      }
    }
    const newCompany = await Company.create(req.body)
    return res.json({
      status: 'You applied for establishing a new copmany',
      data: newCompany
    })
  } catch (error) {
    console.log('error')
  }
})
const isValidDate = stringDate => {
  const date = new Date(stringDate)
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
}

module.exports = router
