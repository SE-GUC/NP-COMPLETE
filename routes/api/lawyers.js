// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/lawyerController')
const passport = require('passport')

router.get('/allowedCompanies', controller.allowedCompanies)

// Read all Lawyers (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new Lawyer
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Lawyer given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Lawyer given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Lawyer given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', passport.authenticate('jwt', { session: false }), controller.viewDepartmentTask)

// As a lawyer i should be able to fill forms delegated to me by an investor (creating company with its form)
router.post('/newForm', passport.authenticate('jwt', { session: false }), controller.newForm)

// As a lawyer I should be able to review forms filled by an investor, so that I can ensure their validity.
router.get('/viewForm/:id', passport.authenticate('jwt', { session: false }), controller.viewForm)

// As a lawyer I should be able to accept or reject forms filled by the investor, so that further action can be taken.
router.put('/review/:lawyerID/:companyID', passport.authenticate('jwt', { session: false }), controller.review)

// As a lawyer I should be able to edit forms declined by the reviewer and regenerate documents,
// so that I can update the forms and continue with the process
router.put('/editForm/:lawyerId/:companyId', passport.authenticate('jwt', { session: false }), controller.editForm)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', passport.authenticate('jwt', { session: false }), controller.casesPage)

// As a lawyer I should be able to send back rejected forms attached with comments to the investor, so that they can be updated appropriately.
router.put('/addComment/:lawyerId/:companyId', passport.authenticate('jwt', { session: false }), controller.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', passport.authenticate('jwt', { session: false }), controller.workPage)

router.get('/calculateFees/:id', passport.authenticate('jwt', { session: false }), controller.calculateFees)

// Update lawyer's profile
router.put('/updateMyProfile/:id', passport.authenticate('jwt', { session: false }), controller.updateMyProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:lawyerId', passport.authenticate('jwt', { session: false }), controller.showLastWorked)
// register
router.post('/register', passport.authenticate('jwt', { session: false }), controller.register)
// login
router.post('/login', passport.authenticate('jwt', { session: false }), controller.login)

router.post('/resetPassword/:token', controller.resetPassword)

router.get('/confirmation/:token', controller.confirmation)

module.exports = router
