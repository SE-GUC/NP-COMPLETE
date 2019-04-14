// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/adminController')
const passport = require('passport')

// Read all Admins (Default route)
router.get('/', passport.authenticate('jwt', { session: false }), controller.default)

// Create a new Admin
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

// Reads a specific Admin given id in URL
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.read)

// Update an existing Admin given id in URL
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)

// Delete a specific Admin given ID in URL
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', passport.authenticate('jwt', { session: false }), controller.viewDepartmentTask)

// update the deadline of a specfic task given the task id and the new deadline in the body
router.put('/updateDeadline/:id', passport.authenticate('jwt', { session: false }), controller.updateDeadline)

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', passport.authenticate('jwt', { session: false }), controller.viewCases)

// As an admin I should be able to publish established companies details on portal, so that their details are available online.
router.put('/publishCompany/:id', passport.authenticate('jwt', { session: false }), controller.publishCompany)

// View All cases (Companies) on the system
router.get('/viewCases/:id', passport.authenticate('jwt', { session: false }), controller.viewCases)

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', passport.authenticate('jwt', { session: false }), controller.workPage)

// Update admin's profile
router.put('/updateMyProfile/:id', passport.authenticate('jwt', { session: false }), controller.updateProfile)

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:adminId', passport.authenticate('jwt', { session: false }), controller.showLastWorked)

// As an admin I should be able to view the investors' feedback so that I can make the right improvements to the service
router.get('/getFeedback/:id', passport.authenticate('jwt', { session: false }), controller.getFeedback)
router.get('/showLastWorked/:companyId/:adminId', passport.authenticate('jwt', { session: false }), controller.showLastWorked)
// register
router.post('/register', passport.authenticate('jwt', { session: false }), controller.register)
// login
router.post('/login', controller.login)
module.exports = router
