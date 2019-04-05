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

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:adminId', adminController.showLastWorked)

// As an admin I should be able to view the investors' feedback so that I can make the right improvements to the service
router.get('/getFeedback/:id', adminController.getFeedback)

router.get('/showLastWorked/:companyId/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId
    const admin = await Admin.findById(adminId)
    if (!admin) { // make sure that the one accessing the page is an admin
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }
    const companyId = req.params.companyId
    const requestedCase = await Company.findById(companyId)
    if (!requestedCase) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Case not found'
      })
    }
    const result = []
    if (requestedCase.form.acceptedByLawyer !== -1) {
      const lawyer = await Lawyer.findById(requestedCase.form.lawyerID)
      result.push('Lawyer: ' + lawyer.fullName)
    }
    if (requestedCase.form.acceptedByReviewer !== -1) {
      const reviewer = await Reviewer.findById(requestedCase.form.reviewerID)
      result.push('Reviewer: ' + reviewer.fullName)
    }
    return res.json({
      status: 'Success',
      message: `This case was last worked on by:`,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
