// Load modules
const express = require('express')
const router = express.Router()

const reviewerController = require('../../controllers/reviewerController')

// Read all Reviewers (Default route)
router.get('/', reviewerController.getAll)

// Creating a new Reviewer
router.post('/', reviewerController.create)

// Reading a specific Reviewer given id in URL
router.get('/:id', reviewerController.getByID)

// Update an existing Reviewer given id in URL
router.put('/:id', reviewerController.update)

// Delete a specific Reviewer given ID in URL
router.delete('/:id', reviewerController.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', reviewerController.viewDepartmentTask)

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject
router.get('/formsToReview/:id', reviewerController.reviewForms)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', reviewerController.casePage)

// As a reviewer I should be able to accept or reject an application, so that the application goes to the next stage or go back to the updating stage accordingly.
router.put('/decideAnApplication/:reviewerId/:companyId', reviewerController.decideApplication)

// As a reviewer I should be able to add comments on rejected forms, so that the lawyers can know what to update.
router.put('/addComment/:reviewerID/:companyID', reviewerController.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', reviewerController.workPage)

// Update reviewer's profile
router.put('/updateMyProfile/:id', reviewerController.updateProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:reviewerId', reviewerController.showLastWorked)

module.exports = router
