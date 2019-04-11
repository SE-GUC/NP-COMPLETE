// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/lawyerController')

// Read all Lawyers (Default route)
router.get('/', controller.default)

// Create a new Lawyer
router.post('/', controller.create)

// Reads a specific Lawyer given id in URL
router.get('/:id', controller.read)

// Update an existing Lawyer given id in URL
router.put('/:id', controller.update)

// Delete a specific Lawyer given ID in URL
router.delete('/:id', controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', controller.viewDepartmentTask)

// As a lawyer i should be able to fill forms delegated to me by an investor (creating company with its form)
router.post('/newForm', controller.newForm)

// As a lawyer I should be able to review forms filled by an investor, so that I can ensure their validity.
router.get('/viewForm/:id', controller.viewForm)

// As a lawyer I should be able to accept or reject forms filled by the investor, so that further action can be taken.
router.put('/review/:lawyerID/:companyID', controller.review)

// As a lawyer I should be able to edit forms declined by the reviewer and regenerate documents,
// so that I can update the forms and continue with the process
router.put('/editForm/:lawyerId/:companyId', controller.editForm)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', controller.casesPage)

// As a lawyer I should be able to send back rejected forms attached with comments to the investor, so that they can be updated appropriately.
router.put('/addComment/:lawyerId/:companyId', controller.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', controller.workPage)

router.get('/calculateFees/:id', controller.calculateFees)

// Update lawyer's profile
router.put('/updateMyProfile/:id', controller.updateMyProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:lawyerId', controller.showLastWorked)
// register
router.post('/register', controller.register)
module.exports = router
