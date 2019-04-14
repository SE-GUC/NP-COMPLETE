const reviewer = require('./reviewer')
const company = require('./company')
const task = require('./task')

jest.setTimeout(10000)

test('fet all reviewers exists', async () => {
  expect.hasAssertions()
  return expect(typeof (reviewer.default)).toBe('function')
})
test('Create-a-Reviewer exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.createReviewer)).toBe('function')
})

test('Create a Reviewer', async () => {
  const data = {
    fullName: 'Omar Ayman Abdelmagied',
    birthdate: '1998-07-09',
    email: 'omar@valid.com',
    startDate: '2010-01-01',
    password: 'mr123456'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const reviewerId = createdData._id
  data['birthdate'] = new Date(data['birthdate']).toISOString()
  data['startDate'] = new Date(data['startDate']).toISOString()

  expect.hasAssertions()
  expect(createdData).toMatchObject(data)
  await reviewer.deleteReviewer(reviewerId)
})

test('Read-a-Reviewer exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.readReviewer)).toBe('function')
})

test('Read a Reviewer by id', async () => {
  const data = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02',
    password: 'mr123456'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await reviewer.readReviewer(id)
  const readData = read.data.data
  expect.hasAssertions()
  expect(readData).toEqual(createdData)
  await reviewer.deleteReviewer(id)
})

test('Update-a-Reviewer exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.updateReviewer)).toBe('function')
})

test('Update a Reviewer by id', async () => {
  const data = {
    fullName: 'Omar Ayman Abdelmagied',
    birthdate: '1998-07-09',
    email: 'omar@valid.com',
    startDate: '2010-01-01',
    password: 'mr123456'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  createdData['fullName'] = 'Abdo Ayman Abdelmagied'
  createdData['workingHours'] = 10
  createdData['salary'] = 5000.0

  const update = {
    fullName: 'Abdo Ayman Abdelmagied',
    workingHours: 10,
    salary: 5000.0
  }
  const updated = await reviewer.updateReviewer(id, update)
  const updatedData = updated.data.data
  expect.hasAssertions()
  expect(updatedData).toEqual(createdData)
  await reviewer.deleteReviewer(id)
})

test('Delete-a-Reviewer exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.deleteReviewer)).toBe('function')
})

test('Delete a Reviewer by id', async () => {
  const data = {
    fullName: 'Lujine el Feky',
    birthdate: '2001-10-02',
    email: 'Lujine@Girl.net',
    startDate: '1998-10-02',
    password: 'mr123456'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await reviewer.deleteReviewer(id)
  const deletedData = deleted.data.deleted
  expect.hasAssertions()
  expect(deletedData).toEqual(createdData)
})

// 4.01
const trueDecisionData = {
  decision: true
}
const falseDecisionData = {
  decision: false
}
const reviewerData = {
  fullName: 'Mostafa test',
  birthdate: '1888-02-15',
  email: 'Notsogreat@guy.com',
  startDate: '1998-10-02',
  password: 'mr123456'
}

const companyNotReviewedData = {
  name: 'Disney',
  establishmentDate: '1923-10-16T00:00:00.000Z',
  type: 'SSC',
  state: 'Pending',
  accepted: false,
  investorId: '5c9614f2fe51f5258ce36f91',
  form: {
    data: [],
    comment: 'No comment',
    acceptedByLawyer: 1,
    acceptedByReviewer: -1,
    filledByLawyer: false,
    paid: false,
    lawyerID: '5c9a6888bca2114a80a5c124'
  }
}

const companyAlreadyReviewedData = {
  name: 'Disney',
  establishmentDate: '1923-10-16T00:00:00.000Z',
  type: 'SSC',
  state: 'Pending',
  accepted: false,
  investorId: '5c9614f2fe51f5258ce36f91',
  form: {
    data: [],
    comment: 'No comment',
    acceptedByLawyer: 1,
    acceptedByReviewer: 1,
    filledByLawyer: false,
    paid: false,
    lawyerID: '5c9a6888bca2114a80a5c124',
    reviewerID: '5c9a6888bca2114a80a5c124'
  }
}

const companyNotAcceptedByLawyerData = {
  name: 'Disney',
  establishmentDate: '1923-10-16T00:00:00.000Z',
  type: 'SSC',
  state: 'Pending',
  accepted: false,
  investorId: '5c9614f2fe51f5258ce36f91',
  form: {
    data: [],
    comment: 'No comment',
    acceptedByLawyer: -1,
    acceptedByReviewer: -1,
    filledByLawyer: false,
    paid: false,
    lawyerID: '5c9a6888bca2114a80a5c124',
    reviewerID: '5c9a6888bca2114a80a5c124'
  }
}

test('decideAnApplication exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.decideAnApplication)).toBe('function')
})

test('Accepting an application by company id and reviewer id, not reviewed before', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    const form = await reviewer.decideAnApplication(reviewerId, companyId, trueDecisionData)
    const reviewed = form.data.data['acceptedByReviewer']
    const id = form.data.data['reviewerID']
    expect.hasAssertions()
    expect(id).toEqual(reviewerId)
    expect(reviewed).toEqual(1)
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  } catch (error) {
    console.log(error)
  }
})

test('Rejecting an application by company id and reviewer id', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    const form = await reviewer.decideAnApplication(reviewerId, companyId, falseDecisionData)
    const reviewed = form.data.data['acceptedByReviewer']
    const id = form.data.data['reviewerID']
    expect.hasAssertions()
    expect(id).toEqual(reviewerId)
    expect(reviewed).toBe(0)
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  } catch (error) {
    console.log(error)
  }
})

test('Accepting an already accepted application by company id and reviewer id', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyAlreadyReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    // check that this request must return an error
    expect(await reviewer.decideAnApplication(reviewerId, companyId, trueDecisionData)).toThrowError()
  } catch (err) {
    // check the status code
    const statusCode = err['response'].status
    expect(statusCode).toEqual(400)

    // check the custom error message
    const customError = err['response'].data
    expect(customError.status).toEqual('Error')
    expect(customError.message).toEqual('Form already accepted by reviewer')

    expect.hasAssertions()
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  }
})

test('Accepting an application No decision given', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    // check that this request must return an error
    expect(await reviewer.decideAnApplication(reviewerId, companyId, { })).toThrowError()
  } catch (err) {
    // check the status code
    const statusCode = err['response'].status
    expect(statusCode).toEqual(400)

    // check the custom error message
    const customError = err['response'].data
    expect(customError.status).toEqual('Error')
    expect(customError.message).toEqual('Decision not given')

    expect.assertions(3)
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  }
})

test('Accepting an application decision string rejected', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    // check that this request must return an error
    expect(await reviewer.decideAnApplication(reviewerId, companyId, { decision: 'true' })).toThrowError()
  } catch (err) {
    // check the status code
    const statusCode = err['response'].status
    expect(statusCode).toEqual(400)

    // check the custom error message
    const customError = err['response'].data
    expect(customError.status).toEqual('Error')
    expect(customError.message).toEqual('Variable decision needs to be a boolean type')

    expect.hasAssertions()
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  }
})

test('Accepting an application not accepted by lawyer', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotAcceptedByLawyerData)
  const companyId = createdCompany.data.data['_id']

  try {
    // check that this request must return an error
    expect(await reviewer.decideAnApplication(reviewerId, companyId, trueDecisionData)).toThrowError()
  } catch (err) {
    // check the status code
    const statusCode = err['response'].status
    expect(statusCode).toEqual(400)

    // check the custom error message
    const customError = err['response'].data
    expect(customError.status).toEqual('Error')
    expect(customError.message).toEqual('Form not accepted by lawyer')

    expect.hasAssertions()
    await company.deleteCompany(companyId)
    await reviewer.deleteReviewer(reviewerId)
  }
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details

// Test the function exists
test('View-Cases-exists', async () => {
  expect.hasAssertions()
  return expect(typeof (reviewer.viewCases)).toBe('function')
})

// Test the functionality
test('Reviewer view all cases', async () => {
  const reviewerData = {
    fullName: 'Elliot Alderson',
    birthdate: '2001-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02',
    password: 'mr123456'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']
  const reviewerViewedCases = await reviewer.viewCases(reviewerId)
  const reviewerViewedCasesData = reviewerViewedCases.data.data
  const availableCompanies = await company.default()
  const availableCompaniesData = availableCompanies.data.data
  expect.hasAssertions()
  expect(reviewerViewedCasesData).toEqual(availableCompaniesData)
  await reviewer.deleteReviewer(reviewerId)
})

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject

// Testing if the function exists
test('Reviewer-preview-forms-exists', async () => {
  expect.hasAssertions()
  return expect(typeof (reviewer.formsToReview)).toBe('function')
})

// Testing the functionality
// test('Reviewer preview unreviewed forms', async () => {
//   const reviewerData = {
//     fullName: 'Bryan Mills',
//     birthdate: '2001-10-02',
//     email: 'bryan@icoud.com',
//     startDate: '1998-10-02'
//   }
//   const createdReviewer = await reviewer.createReviewer(reviewerData)
//   const createdReviewerData = createdReviewer.data.data
//   const reviewerId = createdReviewerData['_id']

//   const returned = await reviewer.formsToReview(reviewerId)
//   const result = returned.data.data
//   expect.hasAssertions()

//   await reviewer.deleteReviewer(reviewerId)
// })

test('add-a-comment exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.addComment)).toBe('function')
})

test('Adding a comment on a rejected application', async () => {
  const reviewerData = {
    fullName: 'R K L',
    birthdate: '1940',
    email: 'R@K.L',
    startDate: '1966',
    password: 'mr123456'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const id = createdReviewer.data.data._id

  const companyData = {
    name: 'Lott',
    establishmentDate: '1967',
    type: 'SPC',
    state: 'Pending',
    accepted: false,
    form: {
      data: [],
      acceptedByLawyer: 1,
      acceptedByReviewer: 0,
      filledByLawyer: false,
      paid: false,
      reviewerID: id
    }
  }

  const createdCompany = await company.createCompany(companyData)
  const companyId = createdCompany.data.data._id
  const commentData = {
    reviewerId: id,
    comment: 'I prefer other companies'
  }

  const addedComment = await reviewer.addComment(id, companyId, commentData)
  const response = addedComment.data.data
  expect.hasAssertions()
  expect(response.form.comment).toEqual(commentData.comment)
  await reviewer.deleteReviewer(id)
  await company.deleteCompany(companyId)
})

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.

// Test that the function exists
test('View-my-department-tasks exists', async () => {
  expect.hasAssertions()
  expect(typeof (reviewer.viewDepartmentTasks)).toBe('function')
})

// Test the functionalty
test('Reviewer view his department tasks by id', async () => {
  const reviewerData = {
    fullName: 'John Smith',
    birthdate: '1996-10-02',
    email: 'mko@tower.net',
    startDate: '2019-02-02',
    password: 'mr123456'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']
  const reviewerDepartmentTasks = await reviewer.viewDepartmentTasks(reviewerId)
  const reviewerDepartmentTasksData = reviewerDepartmentTasks.data.data
  const myDepartmentTasks = await task.viewDepartmentTask({ department: 'Reviewer' })
  const myDepartmentTasksData = myDepartmentTasks.data.data
  expect.hasAssertions()
  expect(reviewerDepartmentTasksData).toEqual(myDepartmentTasksData)
  await reviewer.deleteReviewer(reviewerId)
})

test('Reviewer workPage-exists', async () => {
  expect.assertions(1)
  return expect(typeof (reviewer.workPage)).toBe('function')
})

test('Reviewer workPage', async () => {
  const reviewerData = {
    fullName: 'Elliot Alderson',
    birthdate: '1995-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02',
    password: 'mr123456'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']

  const taskData = {
    department: 'Reviewer',
    creationDate: '2019-02-02T00:00:00.000Z',
    deadline: '2019-02-06T00:00:00.000Z',
    handler: [reviewerId],
    description: 'Review'
  }

  const createdTask = await task.createTask(taskData)
  const createdTaskData = createdTask.data.data
  const taskhandler = createdTaskData['handler']
  const taskId = createdTaskData._id

  const reviewerWorkPage = await reviewer.workPage(reviewerId)
  const reviewerWorkPageData = reviewerWorkPage.data.data[0].handler[0]
  expect.assertions(1)
  expect(reviewerWorkPageData).toEqual(taskhandler[0])
  await reviewer.deleteReviewer(reviewerId)
  await task.deleteTask(taskId)
})
