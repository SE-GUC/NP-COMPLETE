// Load modules
const express = require('express')
const router = express.Router()

// Lawyer models
const Lawyer = require('../../models/Lawyer')
const Company = require('../../models/Company')
const ExternalEntity = require('../../models/ExternalEntity')
const Task = require('../../models/Task')
const CompanyType = require('../../models/CompanyType')
const Reviewer = require('../../models/Reviewer')
// Lawyer validators
const validator = require('../../validations/lawyerValidations')

// Company validators
const companyValidator = require('../../validations/companyValidations')

// Read all Lawyers (Default route)
router.get('/', async (req, res) => {
  const lawyers = await Lawyer.find()
  res.json({ data: lawyers })
})

// Create a new Lawyer
router.post('/', async (req, res) => {
  try {
    const data = req.body

    const isValidated = validator.createValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }

    const newLawyer = await Lawyer.create(data)
    return res.json({
      status: 'Success',
      message: `New lawyer created successfully`,
      data: newLawyer
    })
  } catch (error) {
    console.log(error)
  }
})

// Reads a specific Lawyer given id in URL
router.get('/:id', async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await Lawyer.findById(lawyerId)
    if (lawyer) {
      res.json({ data: lawyer })
    } else {
      res.status(400).json({
        status: 'Error',
        message: 'Lawyer not found'
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// Update an existing Lawyer given id in URL
router.put('/:id', async (req, res) => {
  try {
    const data = req.body
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to update'
      })
    }
    const id = req.params.id
    const lawyer = await Lawyer.findById(id)

    if (!lawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'Lawyer not found'
      })
    }
    const isValidated = validator.updateValidation(data)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message,
        data: data
      })
    }
    const query = { '_id': id }
    const updatedLawyer = await Lawyer.findByIdAndUpdate(query, req.body, { new: true })
    return res.json({
      status: 'Success',
      message: `Updated lawyer with id ${id}`,
      data: updatedLawyer
    })
  } catch (error) {
    console.log(error)
  }
})

// Delete a specific Lawyer given ID in URL

router.delete('/:id', async (req, res) => {
  try {
    const lawyerId = req.params.id
    const deletedLawyer = await Lawyer.findByIdAndRemove(lawyerId)

    if (!deletedLawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'lawyer not found',
        availableLawyers: await Lawyer.find()
      })
    }

    res.json({
      status: 'Success',
      message: `Deleted lawyer with id ${lawyerId}`,
      deletedLawyer: deletedLawyer,
      remainingLawyers: await Lawyer.find()
    })
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.
router.get('/viewDepartmentTask/:id', async (req, res) => {
  const lawyerId = req.params.id
  const userLawyer = await Lawyer.findById(lawyerId)
  if (!userLawyer) {
    return res.status(400).json({
      status: 'Error',
      message: 'Lawyer not found',
      availableLawyer: await Lawyer.find()
    })
  }
  const query = { 'department': 'Lawyer' }
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

// As a lawyer i should be able to fill forms delegated to me by an investor (creating company with its form)
router.post('/newForm', async (req, res) => {
  if (req.body.form.filledByLawyer !== true || req.body.form.acceptedByLawyer !== 1) {
    return res.status(400).json({
      status: 'error',
      message: 'the filled/accepted by lawyer field must be true'
    })
  }
  res.redirect(307, '/api/companies/')
})

// As a lawyer I should be able to review forms filled by an investor, so that I can ensure their validity.
router.get('/viewForm/:id', async (req, res) => {
  try {
    const investorId = req.params.id
    const query = { 'investorId': investorId }
    const companies = await Company.find(query)
    if (!companies) {
      return res.status(404).json({
        status: 'error',
        message: 'Form not found'
      })
    } else {
      var i
      var x = ''
      for (i = 0; i < companies.length; i++) {
        x += `Company: ${companies[i].name} has form: ${companies[i].form.data}, `
      }
      res.json({
        data: x
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// As a lawyer I should be able to accept or reject forms filled by the investor, so that further action can be taken.
router.put('/review/:lawyerID/:companyID', async (req, res) => {
  try {
    // Check if the body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        message: 'No data to put a review'
      })
    }
    // check if the review is given in the body or not
    const review = req.body.acceptedByLawyer
    if (review === null || review === undefined) {
      return res.status(400).json({
        status: 'Error',
        message: 'Review not given'
      })
    }
    // check if the value of the review is valid
    if (review !== 0 && review !== 1) {
      return res.status(400).json({
        status: 'Error',
        message: 'Review value is not valid'
      })
    }

    // create the update body
    const newData = { 'form.acceptedByLawyer': req.body.acceptedByLawyer, 'form.lawyerID': req.params.lawyerID }
    if (review === 0) {
      // chech for comment
      const comment = req.body.comment
      if (!comment) {
        return res.status(400).json({
          status: 'Error',
          message: 'Comment not given'
        })
      }
      if (typeof (comment) !== 'string') {
        return res.status(400).json({
          status: 'Error',
          message: 'Comment type is not valid'
        })
      }
      newData['form.comment'] = comment
    }
    // check if the lawyer exists
    const lawyer = await Lawyer.findById(req.params.lawyerID)
    if (!lawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'This lawyer doesnt exist'
      })
    }
    // check if the company exists
    const company = await Company.findById(req.params.companyID)
    if (!company) {
      return res.status(400).json({
        status: 'Error',
        message: 'This company doesnt exist'
      })
    }

    if (company.form.acceptedByLawyer !== -1) {
      return res.status(400).json({
        status: 'Error',
        message: 'This form is already reviewed'
      })
    }

    // Changing value to the new value
    const updatedCompany = await Company.findByIdAndUpdate(req.params.companyID, newData, { new: true })

    return res.json({
      status: 'Success',
      message: `Reviewed Form of Company with id ${req.params.id}`,
      data: updatedCompany.form
    })
  } catch (error) {
    console.log(error)
  }
})

// As a lawyer I should be able to edit forms declined by the reviewer and regenerate documents,
// so that I can update the forms and continue with the process
router.put('/editForm/:lawyerId/:companyId', async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId
    const companyId = req.params.companyId

    const lawyer = await Lawyer.findById(lawyerId)
    if (!lawyer) {
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied, only internal users allowed'
      })
    }

    const isValidated = companyValidator.editFormValidation(req.body)
    if (isValidated.error) {
      return res.status(400).json({
        status: 'Error',
        message: isValidated.error.details[0].message
      })
    }

    const update = {
      $set: {
        'form.data': req.body.data,
        'form.acceptedByLawyer': 1
      }
    }
    const updatedCompany = await Company.findByIdAndUpdate(companyId, update, { new: true })
    if (!updatedCompany) {
      return res.status(400).json({
        status: 'Error',
        message: 'Could not find Form you are looking for'
      })
    } else {
      return res.json({
        status: 'Success',
        message: `Edited requested formm of Company with id ${companyId}`,
        updatedCompany: updatedCompany
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details
router.get('/casesPage/:id', async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await Lawyer.findById(lawyerId)
    if (!lawyer) { // make sure that the one accessing the page is a lawyer
      return res.status(400).json({
        status: 'Error',
        message: 'Lawyer access required'
      })
    }
    res.redirect(307, '/api/companies/') // redirect to companies get route.
  } catch (error) {
    console.log(error)
  }
})

// As a lawyer I should be able to send back rejected forms attached with comments to the investor, so that they can be updated appropriately.
router.put('/addComment/:lawyerId/:companyId', async (req, res) => {
  const lawyerId = req.params.lawyerId
  const companyId = req.params.companyId
  const comment = req.body.comment
  if (!comment) {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable comment is required'
    })
  }
  if (typeof comment !== 'string') {
    return res.status(400).json({
      status: 'Error',
      message: 'Variable comment needs to be a string'
    })
  }
  try {
    const lawyer = await Lawyer.findById(lawyerId)
    if (!lawyer) {
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

    if (company.form.acceptedByLawyer !== 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'Form not rejected by lawyer'
      })
    }

    const query = { '_id': companyId }
    const newData = { 'form.comment': comment }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    res.json({
      status: 'Success',
      message: `Added comment: ${comment} to form of company with id: ${companyId}`,
      data: updatedCompany.form
    })
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I should have a Work page which lists the tasks due for me as a logged in user so that I can perform my work tasks
router.get('/workPage/:id', async (req, res) => {
  try {
    const lawyerId = req.params.id
    const lawyer = await Lawyer.findOne({ _id: lawyerId })
    if (!lawyer) { // Restrict access to reviewers only.
      return res.status(400).json({
        status: 'Error',
        message: 'Only Internal Users have access to this page',
        availableReviewers: await Lawyer.find()
      })
    }
    const tasksAssigned = await Task.find() // query the database to retrieve all available tasks
    if (!tasksAssigned) { // check if there's no tasks
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks available'
      })
    }
    const tasks = []
    for (var i = 0; i < tasksAssigned.length; i++) {
      if (tasksAssigned[i].handler.indexOf(lawyerId) > -1) {
        tasks.push(tasksAssigned[i])
      }
    }
    if (!tasks) {
      return res.status(400).json({
        status: 'Error',
        message: 'No tasks for this lawyer'
      })
    } else {
      return res.json({
        status: 'Success',
        data: tasks
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/calculateFees/:id', async (req, res) => {
  try {
    const companyId = req.params.id
    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company cannot be found'
      })
    }
    const type = company.type
    const companyType = CompanyType.findOne({ companyType: type })
    if (!companyType) {
      return res.status(400).json({
        status: 'Error',
        message: 'Company type cannot be found'
      })
    }
    const fields = companyType.fields
    var i
    for (i = 0; i < fields.length; i++) {
      if (fields[i] === 'capital') {
        break
      }
    }
    const capital = company.form.data[i]
    const fees = calculateFees(capital)

    const query = { '_id': companyId }
    const newData = { 'form.fees': fees }
    const updatedCompany = await Company.findByIdAndUpdate(query, newData, { new: true })

    return res.json({
      status: 'Success',
      message: 'Company fees calculated',
      company: updatedCompany
    })
  } catch (error) {
    console.log(error)
  }
})

const calculateFees = async capital => {
  const entities = await ExternalEntity.find()
  var fees = 0
  entities.forEach(entity => {
    var fee = entity.feesPercentage * capital
    if (fee < entity.feesMin) {
      fee = entity.feesMin
    }
    if (fee > entity.feesMax) {
      fee = entity.feesMax
    }
    fees += fee
  })
  return fees
}

// Update lawyer's profile
router.put('/updateMyProfile/:id', async (req, res) => {
  try {
    const stored = Object.keys(req.body)
    if (stored.includes('startDate') || stored.includes('workingHours') || stored.includes('salary')) {
      res.json({
        status: 'Error',
        message: 'Request failed cannot update these attributes'
      })
    } else {
      const id = req.params.id
      res.redirect(307, `/api/lawyers/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
})

// As an Internal User I can see who last worked on a case so that we can all be updated of each other's work
router.get('/showLastWorked/:companyId/:lawyerId', async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId
    const lawyer = await Lawyer.findById(lawyerId)
    if (!lawyer) { // make sure that the one accessing the page is a reviewer
      return res.status(400).json({
        status: 'Error',
        message: 'Access denied'
      })
    }
    const companyId = req.params.companyId
    const requestedCase = await Company.findById(companyId)
    if (!requestedCase) { // make sure that the one accessing the page is a lawyer
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
