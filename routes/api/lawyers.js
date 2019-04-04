// Load modules
const express = require('express')
const router = express.Router()

const lawyerControllers = require('../../controllers/lawyerController')

// Read all Lawyers (Default route)
router.get('/', lawyerControllers.getAll)

// Create a new Lawyer
router.post('/', lawyerControllers.create)

// Reads a specific Lawyer given id in URL
router.get('/:id', lawyerControllers.readByID)

// Update an existing Lawyer given id in URL
router.put('/:id', lawyerControllers.update)

// Delete a specific Lawyer given ID in URL
router.delete('/:id', lawyerControllers.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', lawyerControllers.viewDepartmentTask)

// As a lawyer i should be able to fill forms delegated to me by an investor (creating company with its form)
router.post('/newForm', lawyerControllers.newForm)

// As a lawyer I should be able to review forms filled by an investor, so that I can ensure their validity.
router.get('/viewForm/:id', lawyerControllers.viewForm)

// As a lawyer I should be able to accept or reject forms filled by the investor, so that further action can be taken.
router.put('/review/:lawyerID/:companyID', lawyerControllers.review)

// As a lawyer I should be able to edit forms declined by the reviewer and regenerate documents,
// so that I can update the forms and continue with the process
router.put('/editForm/:lawyerId/:companyId', lawyerControllers.editForm)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', lawyerControllers.casesPage)

// As a lawyer I should be able to send back rejected forms attached with comments to the investor, so that they can be updated appropriately.
router.put('/addComment/:lawyerId/:companyId', lawyerControllers.addComment)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', lawyerControllers.workPage)

router.get('/calculateFees/:id', lawyerControllers.calculateFees)

// Update lawyer's profile
router.put('/updateMyProfile/:id', lawyerControllers.updateMyProfile)

module.exports = router
