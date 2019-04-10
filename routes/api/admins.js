// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/adminController')

// Read all Admins (Default route)
router.get('/', controller.default)

// Create a new Admin
router.post('/', controller.create)

// Reads a specific Admin given id in URL
router.get('/:id', controller.read)

// Update an existing Admin given id in URL
router.put('/:id', controller.update)

// Delete a specific Admin given ID in URL
router.delete('/:id', controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', controller.viewTask)

// update the deadline of a specfic task given the task id and the new deadline in the body
router.put('/updateDeadline/:id', controller.updateDeadline)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', controller.viewCases)

// As an admin I should be able to publish established companies details on portal, so that their details are available online.
router.put('/publishCompany/:id', controller.publishCompany)

// View All cases (Companies) on the system
router.get('/viewCases/:id', controller.viewCases)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', controller.workPage)

// Update admin's profile
router.put('/updateMyProfile/:id', controller.updateProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:adminId', controller.showLastWorked)

// As an admin I should be able to view the investors' feedback so that I can make the right improvements to the service
router.get('/getFeedback/:id', controller.getFeedback)
router.get('/showLastWorked/:companyId/:adminId', controller.showLastWorked)

module.exports = router
