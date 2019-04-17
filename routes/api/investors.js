// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/investorController')
const passport = require('passport')

// Read all Investors (Default route)
router.get('/', controller.default)

// Create a new Investor
router.post('/', controller.create)

// Reads a specific Investor given id in URL
router.get('/:id', controller.read)

// Update an existing Investor given id in URL
router.put('/:id', controller.update)

// Delete a specific Investor given ID in URL
router.delete('/:id', controller.delete)

// As an investor I should be able to cancel an unreviewed application, so that I can stop the process of establishing a company I don't want anymore.
router.delete('/CancelApplication/:id', controller.cancelApplication)

// As an investor I should be able to view rejected forms with the lawyer's comments, so that I can know which data to update.
router.get('/viewRejected/:id', controller.viewRejectedForm)

// as an investor i should be able to update forms rejected by the lawyer
router.put('/editForm/:id', controller.editForms)

// As an investor I should be able to view a list of my current or pending companies, so that I can access their details.
router.get('/getCompanies/:id', passport.authenticate('jwt', { session: false }), controller.getCompanies)

// As an investor I should be able to fill an application form, so that I can establish a company.
router.post('/fillForm/:id', controller.fillForm)

// as an investor i should be able to pay the fees to establish my company
// will be verified with stripe to add real fees in the front end
router.put('/payFees/:id', controller.payFees)
router.post('/fees', controller.fees)
// As an investor I should be able to read a description of the form,
// so that I can understand what to fill in each field
router.get('/readDescription/:type', controller.readDescription)

router.put('/reviewOnlineService/:companyId/:investorId', controller.reviewOnlineService)
// register
router.post('/register', controller.register)
// login
router.post('/login', controller.login)

module.exports = router
