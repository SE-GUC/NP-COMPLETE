const reviewer = require('./reviewer')
const company = require('./company')
const task = require('./task')

//! Needs to test Default

test('Create-a-Reviewer exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.createReviewer)).toBe('function')
})

test('Create a Reviewer', async () => {
  const data = {
    fullName: 'Omar Ayman Abdelmagied',
    birthdate: '1998-07-09',
    email: 'omar@valid.com',
    startDate: '2010-01-01'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  data['birthdate'] = new Date(data['birthdate']).toISOString()
  data['startDate'] = new Date(data['startDate']).toISOString()

  expect.assertions(1)
  expect(createdData).toMatchObject(data)
})

test('Read-a-Reviewer exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.readReviewer)).toBe('function')
})

test('Read a Reviewer by id', async () => {
  const data = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await reviewer.readReviewer(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
}, 10000)

test('Update-a-Reviewer exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.updateReviewer)).toBe('function')
})

test('Update a Reviewer by id', async () => {
  const data = {
    fullName: 'Omar Ayman Abdelmagied',
    birthdate: '1998-07-09',
    email: 'omar@valid.com',
    startDate: '2010-01-01'
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
  expect.assertions(1)
  expect(updatedData).toEqual(createdData)
})

test('Delete-a-Reviewer exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.deleteReviewer)).toBe('function')
},
10000)

test('Delete a Reviewer by id', async () => {
  const data = {
    fullName: 'Lujine el Feky',
    birthdate: '2001-10-02',
    email: 'Lujine@Girl.net',
    startDate: '1998-10-02'
  }
  const created = await reviewer.createReviewer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await reviewer.deleteReviewer(id)
  const deletedData = deleted.data.deletedReviewer
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
}, 10000)

test('decideAnApplication exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.decideAnApplication)).toBe('function')
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details

// Test the function exists
test('View-Cases-exists', async () => {
  expect.assertions(1)
  return expect(typeof (reviewer.viewCases)).toBe('function')
})

// Test the functionality
test('Reviewer view all cases', async () => {
  const reviewerData = {
    fullName: 'Elliot Alderson',
    birthdate: '2001-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']
  const reviewerViewedCases = await reviewer.viewCases(reviewerId)
  const reviewerViewedCasesData = reviewerViewedCases.data.data
  const availableCompanies = await company.default()
  const availableCompaniesData = availableCompanies.data.data
  expect.assertions(1)
  expect(reviewerViewedCasesData).toEqual(availableCompaniesData)
})

// As a reviewer I should be able to preview (read only) applications, so that I can decide whether to accept or reject

// Testing if the function exists
test('Reviewer-preview-forms-exists', async () => {
  expect.assertions(1)
  return expect(typeof (reviewer.formsToReview)).toBe('function')
})

// Testing the functionality
test('Reviewer preview unreviewed forms', async () => {
  const reviewerData = {
    fullName: 'Bryan Mills',
    birthdate: '2001-10-02',
    email: 'bryan@icoud.com',
    startDate: '1998-10-02'
  }

  const companyData1 = {
    name: 'Evil Corp',
    establishmentDate: '1996-08-20',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'good',
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124'
    }
  }
  // should not appear in the output.
  const companyData2 = {
    name: 'Swivel',
    establishmentDate: '2001-04-26',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: ['company details'],
      comment: 'decent',
      acceptedByLawyer: 0,
      acceptedByReviewer: -1,
      filledByLawyer: true,
      paid: false,
      lawyerID: '5c9a6888bca2114a80a5c124'
    }
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']

  const firstCase = await company.createCompany(companyData1)
  const form1 = firstCase.data.data.form
  const secondCase = await company.createCompany(companyData2)
  // const secondCaseData =  secondCase.data.data
  const expected = form1
  const returned = await reviewer.formsToReview(reviewerId)
  const result = returned.data.data
  expect.assertions(1)
  expect(result).toEqual(expected)
})
test('Accepting an application by company id and reviewer id, not reviewed before', async () => {
  const data = {
    decision: true
  }
  const companyData = {
    name: 'Disney',
    establishmentDate: '1923-10-16T00:00:00.000Z',
    type: 'SSC',
    state: 'pending',
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
  const reviewerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdRevData = createdReviewer.data.data
  const reviewerId = createdRevData['_id']

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const form = await reviewer.decideAnApplication(reviewerId, companyId, data)
  const reviewed = form.data.data['acceptedByReviewer']
  const id = form.data.data['reviewerID']
  expect.assertions(2)
  expect(id).toEqual(reviewerId)
  expect(reviewed).toEqual(1)
}, 20000)

test('Rejecting an application by company id and reviewer id', async () => {
  const data = {
    decision: false
  }
  const companyData = {
    name: 'Disney',
    establishmentDate: '1923-10-16T00:00:00.000Z',
    type: 'SSC',
    state: 'pending',
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
  const reviewerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdRevData = createdReviewer.data.data
  const reviewerId = createdRevData['_id']

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const form = await reviewer.decideAnApplication(reviewerId, companyId, data)
  console.log(form)
  const reviewed = form.data.data['acceptedByReviewer']
  console.log(reviewed)
  const id = form.data.data['reviewerID']
  console.log(id)
  expect.assertions(2)
  expect(id).toEqual(reviewerId)
  expect(reviewed).toBe(0)
}, 20000)

test('add-a-comment exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.addComment)).toBe('function')
})

test('Adding a comment on a rejected application', async () => {
  const reviewerData = {
    fullName: 'R K L',
    birthdate: '1940',
    email: 'R@K.L',
    startDate: '1966'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const id = createdReviewer.data.data._id

  const companyData = {
    name: 'Lott',
    establishmentDate: '1967',
    type: 'SPC',
    state: 'pending',
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
  expect.assertions(1)
  expect(response.form.comment).toEqual(commentData.comment)
}, 20000)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.

// Test that the function exists
test('View-my-department-tasks exists', async () => {
  expect.assertions(1)
  expect(typeof (reviewer.viewDepartmentTasks)).toBe('function')
})

// Test the functionalty
test('Reviewer view his department tasks by id', async () => {
  const reviewerData = {
    fullName: 'John Smith',
    birthdate: '1996-10-02',
    email: 'mko@tower.net',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = createdReviewer.data.data
  const reviewerId = createdReviewerData['_id']
  const reviewerDepartmentTasks = await reviewer.viewDepartmentTasks(reviewerId)
  const reviewerDepartmentTasksData = reviewerDepartmentTasks.data.data
  const myDepartmentTasks = await task.viewDepartmentTask({department:'Reviewer'})
  const myDepartmentTasksData = myDepartmentTasks.data.data
  expect.assertions(1)
  expect(reviewerDepartmentTasksData).toEqual(myDepartmentTasksData)
})
