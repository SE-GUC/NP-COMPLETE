// Load modules
const express = require('express')
const router = express.Router()

// Reviewer model
const Reviewer = require('../../models/Reviewer')
const validator = require('../../validations/reviewerValidations')

// Company model
const Company = require('../../models/Company')
const Task = require('../../models/Task')

// Read all Reviewers (Default route)
router.get('/', async (req, res) => {
  const reviewers = await Reviewer.find()
  res.json({ data: reviewers })
})

// Creating a new Reviewer
router.post('/', async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newReviewer = await Reviewer.create(req.body)
    res.json({ msg: 'Reviewer was created successfully', data: newReviewer })
  } catch (error) {
    console.log(error)
  }
})

// Reading a specific Reviewer given id in URL
router.get('/:id', async (req, res) => {
  const revId = req.params.id
  const reviewer = await Reviewer.findById(revId)
  if (reviewer) {
    res.json({ data: reviewer })
  } else {
    return res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      availableReviewers: await Reviewer.find()
    })
  }
})

// Update an existing Reviewer given id in URL
router.put('/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const reviewer = await Reviewer.findById(reviewerId)
    if (!reviewer) {
      return res.status(404).json({
        status: 'Error',
        message: 'Reviewer does not exist'
      })
    }

    const query = { '_id': reviewerId }
    const updatedReviewer = await Reviewer.findByIdAndUpdate(query, req.body, { new: true })
    res.json({
      status: 'Success',
      message: 'Reviewer updated successfully',
      data: updatedReviewer
    })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific Reviewer given ID in URL
router.delete('/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewerToBeDeleted = await Reviewer.findByIdAndRemove(reviewerId)
    const AllInvestors = await Reviewer.find()
    await Reviewer.findByIdAndRemove({ _id: reviewerId })
    if (!reviewerToBeDeleted) {
      return res.status(400).json({
        status: 'Error',
        message: 'Reviewer not found',
        availableReviewers: await Reviewer.find()
      })
    }
    return res.json({
      status: 'Success',
      message: `Deleted reviewer with id ${reviewerId}`,
      deletedReviewer: reviewerToBeDeleted,
      remainingReviewers: AllInvestors
    })
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', async (req, res) => {
  const reviewerId = req.params.id
  const userReviewer = await Reviewer.findById(reviewerId)
  if (!userReviewer) {
    return res.status(400).json({
      status: 'Error',
      message: 'Reviewer not found',
      availableReviewers: await Reviewer.find()
    })
  }
  const query = { 'department': 'Reviewer' }
  const task = await Task.find(query)
    // check if there exist such task
    if (!task) {
      return res.status(404).json({
        status: 'Error',
        message: 'There are no tasks for your department'
      })
    }
    // view the tasks of the given depratment
    res.json({
      status: 'Success',
      data: task
    })

})

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject
router.get('/formsToReview/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findById(reviewerId)
    if (!reviewer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only reviewers have access to this page',
        availableReviewers: await Reviewer.find()
      })
    }
    const query = { 'form.acceptedByLawyer': 1, 'form.acceptedByReviewer': -1 } // We want the forms accepted by the lawyer but not reviewed yet.
    const companies = await Company.find(query) // query the database to retrieve all available cases
    if (!companies) { // if no cases in the system
      return res.json({
        message: 'No forms available to review'
      })
    }
    var forms = ''
    for (var i = 0; i < companies.length; i++) {
      forms += companies[i].form + '\n' // extract form attribute only
    }
    res.json({ data: forms })
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findById(reviewerId)
    if (!reviewer) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Reviewer access required'
      })
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
})

// As a reviewer I should be able to accept or reject an application, so that the application goes to the next stage or go back to the updating stage accordingly.
router.put('/decideAnApplication/:reviewerId/:companyId', async (req, res) => {
  const reviewerId = req.params.reviewerId
  const companyId = req.params.companyId
  const decision = req.body.decision

  if (decision === null || decision === undefined) {
    return res.status(400).json({
      status: 'Error',
      message: 'Decision not given'
    })
  }

  if (typeof decision !== 'boolean') {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable decision needs to be a boolean type '
    })
  }
  try {
    const reviewer = await Reviewer.findById(reviewerId)
    if (!reviewer) {
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }

    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(404).json({
        status: 'Error',
        message: 'Form not found'
      })
    }

    if (company.form.acceptedByLawyer !== 1) {
      return res.status(404).json({
        status: 'Error',
        message: 'Form not accepted by lawyer'
      })
    }

    if (company.form.acceptedByReviewer === 1) {
      return res.status(404).json({
        status: 'Error',
        message: 'Form already accepted by reviewer'
      })
    }

    let acceptedbyReviewer
    if (decision === true) {
      acceptedbyReviewer = 1
    } else {
      acceptedbyReviewer = 0
    }

    const query = { '_id': companyId }
    const newData = { 'form.acceptedByReviewer': acceptedbyReviewer, 'form.reviewerID': reviewerId }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    res.json({
      status: 'Success',
      message: `Form acceptance by reviewer status is: ${decision}`,
      data: updatedCompany.form
    })
  } catch (error) {
    console.log(error)
  }
})

// As a reviewer I should be able to add comments on rejected forms, so that the lawyers can know what to update.
router.put('/addComment/:reviewerID/:companyID', async (req, res) => {
  const reviewerID = req.params.reviewerID
  const companyID = req.params.companyID

  try {
    const query = { '_id': companyID, 'form.acceptedByReviewer': 0, 'form.reviewerID': reviewerID }
    const newData = { 'form': { 'comment': req.body.comment } }
    const companyEdited = await Company.findOneAndUpdate(query, newData, { new: true })
    console.log(companyEdited)
    if (!companyEdited) {
      return res.status(400).json({
        status: 'Error',
        message: 'Failed to find company'
      })
    }

    res.json({
      status: 'Success',
      message: 'Added comment to form',
      data: companyEdited
    })
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', async (req, res) => {
  try {
    const reviewerId = req.params.id
    const reviewer = await Reviewer.findOne({ _id: reviewerId })
    if (!reviewer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only Internal Users have access to this page',
        availableReviewers: await Reviewer.find()
      })
    }
    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned) { // check if there's no tasks
      return res.json({
        message: 'No tasks available'
      })
    }
    var tasks = ''
    for (var i = 0; i < tasksAssigned.length; i++) {
      for (var j = 0; j < tasksAssigned[i].handler.length; j++) {
        if (tasksAssigned[i].handler[j] === req.params.id) {
          tasks += tasksAssigned[i]
        }
      }
    }
    res.json({
      status: 'Success',
      data: tasks
    })
  } catch (error) {
    console.log(error)
  }
})

// Update reviewer's profile
router.put('/updateMyProfile/:id', async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    console.log(stored)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      res.redirect(`/api/reviewers/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
