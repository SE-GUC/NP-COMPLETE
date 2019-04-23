// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/reviewerController')

router.get('/allowedCompanies', controller.allowedCompanies)
// Read all Reviewers (Default route)
router.get('/', controller.default)

// Create a new Reviewer
router.post('/', controller.create)

// Reads a specific Reviewer given id in URL
router.get('/:id', controller.read)

// Update an existing Reviewer given id in URL
router.put('/:id', controller.update)

// Delete a specific Reviewer given ID in URL
router.delete('/:id', controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', controller.viewDepartmentTask)

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject
router.get('/formsToReview/:id', controller.reviewForms)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', controller.casePage)

// As a reviewer I should be able to accept or reject an application, so that the application goes to the next stage or go back to the updating stage accordingly.
router.put('/decideAnApplication/:reviewerId/:companyId', controller.decideApplication)

// As a reviewer I should be able to add comments on rejected forms, so that the lawyers can know what to update.
router.put('/addComment/:reviewerID/:companyID', controller.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', controller.workPage)

// Update reviewer's profile
router.put('/updateMyProfile/:id', controller.updateProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:reviewerId', controller.showLastWorked)
// register
router.post('/register', controller.register)
// login
router.post('/login', controller.login)
router.post('/resetPassword/:token', controller.resetPassword)
router.get('/confirmation/:token', controller.confirmation)

module.exports = router
