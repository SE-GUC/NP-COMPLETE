// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/investorController')
const passport = require('passport')
// const stripe = require('stripe')('pk_test_gXEdE7jVq08xnKlW6KmsumaF00advWYnHN')
// api for paying fees(investor user story)

// Read all Investors (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new Investor
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Investor given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Investor given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Investor given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

// As an investor I should be able to cancel an unreviewed application, so that I can stop the process of establishing a company I don't want anymore.
router.delete('/CancelApplication/:id', passport.authenticate('jwt', { session: false }), controller.cancelApplication)

// As an investor I should be able to view rejected forms with the lawyer's comments, so that I can know which data to update.
router.get('/viewRejected/:id', passport.authenticate('jwt', { session: false }), controller.viewRejectedForm)

// as an investor i should be able to update forms rejected by the lawyer
router.put('/editForm/:id', passport.authenticate('jwt', { session: false }), controller.editForms)

// As an investor I should be able to view a list of my current or pending companies, so that I can access their details.
router.get('/getCompanies/:id', passport.authenticate('jwt', { session: false }), controller.getCompanies)

// As an investor I should be able to fill an application form, so that I can establish a company.
router.post('/fillForm/:id', passport.authenticate('jwt', { session: false }), controller.fillForm)

// as an investor i should be able to pay the fees to establish my company

// will be verified with stripe to add real fees in the front end
router.put('/payFees/:id', passport.authenticate('jwt', { session: false }), controller.payFees)

router.post('/fees', controller.fees)
// As an investor I should be able to read a description of the form,
// so that I can understand what to fill in each field
router.get('/readDescription/:type', passport.authenticate('jwt', { session: false }), controller.readDescription)

router.put('/reviewOnlineService/:companyId/:investorId', passport.authenticate('jwt', { session: false }), controller.reviewOnlineService)
// register
router.post('/register', controller.register)
// login
router.post('/login', controller.login)
// confirm
router.get('/confirmation/:token', controller.confirmation)
// forget password
router.post('/resetPassword/:token', controller.resetPassword)
module.exports = router
