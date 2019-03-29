const reviewer = require('./reviewer')
const company = require('./company')
//! Needs to test Default

test('Read-a-Reviewer exists', async () => {
  expect.assertions(1)
  return expect(typeof (reviewer.readReviewer)).toBe('function')
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
  return expect(readData).toEqual(createdData)
})

test('Delete-a-Reviewer exists', async () => {
  expect.assertions(1)
  return expect(typeof (reviewer.deleteReviewer)).toBe('function')
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
  return expect(deletedData).toEqual(createdData)
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
  const companyData = {
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
  const created = await reviewer.createReviewer(reviewerData)
  const createdReviewerData = created.data.data
  const reviewerId = createdReviewerData['_id']
  const availableCases = await company.createCompany(companyData)
  const expectedCases = availableCases.data.data
  const result = await reviewer.viewCases(reviewerId)
  const actualCases = result.data.data
  expect.assertions(1)
  expect(actualCases).toEqual(expectedCases)
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
    name: 'Pear',
    establishmentDate: '1996-08-20',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: ['company details'],
      comment: 'decent',
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
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
