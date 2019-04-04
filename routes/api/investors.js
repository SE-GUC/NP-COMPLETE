// Load modules
const express = require('express')
const router = express.Router()
// const stripe = require('stripe')('pk_test_gXEdE7jVq08xnKlW6KmsumaF00advWYnHN')
// api for paying fees(investor user story)

// controllers
const investorControllers = require('../../controllers/investorControllers')

// Read all Investors (Default route)
router.get('/', investorControllers.getAll)

// Create a new Investor
router.post('/', investorControllers.create)

// Reads a specific Investor given id in URL
router.get('/:id', investorControllers.getByID)

// Update an existing Investor given id in URL
router.put('/:id', investorControllers.update)

// Delete a specific Investor given ID in URL
router.delete('/:id', investorControllers.delete)

// As an investor I should be able to cancel an unreviewed application, so that I can stop the process of establishing a company I don't want anymore.
router.put('/CancelApplication/:id', investorControllers.cancelApplication)

// As an investor I should be able to view rejected forms with the lawyer's comments, so that I can know which data to update.
router.get('/viewRejected/:id', investorControllers.viewRejectedForm)

// as an investor i should be able to update forms rejected by the lawyer
router.put('/editForm/:id', investorControllers.editForms)

// As an investor I should be able to view a list of my current or pending companies, so that I can access their details.
router.get('/getCompanies/:id', investorControllers.getCompanies)

// As an investor I should be able to fill an application form, so that I can establish a company.
router.post('/fillForm/:id', investorControllers.fillForm)

// as an investor i should be able to pay the fees to establish my company
// will be verified with stripe to add real fees in the front end
router.put('/payFees/:id', investorControllers.payFees)

// As an investor I should be able to read a description of the form,
// so that I can understand what to fill in each field
router.get('/readDescription/:id', investorControllers.readDescription)

router.get('/trackApplication/:id', investorControllers.trackApplication)
router.put('/reviewOnlineService/:companyId/:investorId', investorControllers.reviewOnlineService)
module.exports = router
