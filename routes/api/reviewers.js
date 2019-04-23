// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/reviewerController')
const passport = require('passport')

router.get('/allowedCompanies', controller.allowedCompanies)
// Read all Reviewers (Default route)
router.get('/', controller.default)

// Create a new Reviewer
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Reviewer given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Reviewer given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Reviewer given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', passport.authenticate('jwt', { session: false }), controller.viewDepartmentTask)

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject
router.get('/formsToReview/:id', passport.authenticate('jwt', { session: false }), controller.reviewForms)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', passport.authenticate('jwt', { session: false }), controller.casePage)

// As a reviewer I should be able to accept or reject an application, so that the application goes to the next stage or go back to the updating stage accordingly.
router.put('/decideAnApplication/:reviewerId/:companyId', passport.authenticate('jwt', { session: false }), controller.decideApplication)

// As a reviewer I should be able to add comments on rejected forms, so that the lawyers can know what to update.
router.put('/addComment/:reviewerID/:companyID', passport.authenticate('jwt', { session: false }), controller.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', passport.authenticate('jwt', { session: false }), controller.workPage)

// Update reviewer's profile
router.put('/updateMyProfile/:id', passport.authenticate('jwt', { session: false }), controller.updateProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:reviewerId', controller.showLastWorked)
// register
router.post('/register', passport.authenticate('jwt', { session: false }), controller.register)
// login
router.post('/login', controller.login)
router.post('/resetPassword/:token', controller.resetPassword)
router.get('/confirmation/:token', controller.confirmation)

module.exports = router
