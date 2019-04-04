// Load modules
const express = require('express')
const router = express.Router()

// Required models
const adminController = require('../../controllers/adminController')
router.delete('/deleteAllEntries/', adminController.deleteAll)

// Read all Admins (Default route)
router.get('/', adminController.getAll)

// Create a new Admin
router.post('/', adminController.create)

// Reads a specific Admin given id in URL
router.get('/:id', adminController.getByID)

// Update an existing Admin given id in URL
router.put('/:id', adminController.update)

// Delete a specific Admin given ID in URL
router.delete('/:id', adminController.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', adminController.viewTask)

// update the deadline of a specfic task given the task id and the new deadline in the body
router.put('/updateDeadline/:id', adminController.updateDeadline)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', adminController.viewCases)

// As an admin I should be able to publish established companies details on portal, so that their details are available online.
router.put('/publishCompany/:id', adminController.publishCompany)

// View All cases (Companies) on the system
router.get('/viewCases/:id', adminController.viewCases)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', adminController.workPage)

// Update admin's profile
router.put('/updateMyProfile/:id', adminController.updateProfile)

// As an admin I should be able to view the investors' feedback so that I can make the right improvements to the service
router.get('/getFeedback/:id', adminController.getFeedback)

module.exports = router
