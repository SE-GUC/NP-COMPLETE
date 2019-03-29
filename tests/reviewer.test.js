const reviewer = require('./reviewer')
const company = require('./company')

//! Needs to test Default

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
  startDate: '1998-10-02'
}

const companyNotReviewedData = {
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

const companyAlreadyReviewedData = {
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
  state: 'pending',
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
  expect.assertions(1)
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
    expect.assertions(2)
    expect(id).toEqual(reviewerId)
    expect(reviewed).toEqual(1)
  } catch (err) {
    console.log(err)
  }
}, 20000)

test('Rejecting an application by company id and reviewer id', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    const form = await reviewer.decideAnApplication(reviewerId, companyId, falseDecisionData)
    const reviewed = form.data.data['acceptedByReviewer']
    const id = form.data.data['reviewerID']
    expect.assertions(2)
    expect(id).toEqual(reviewerId)
    expect(reviewed).toBe(0)
  } catch (err) {
    console.log(err)
  }
}, 20000)

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

    expect.assertions(3)
  }
}, 20000)

test('No decision given', async () => {
  const createdReviewer = await reviewer.createReviewer(reviewerData)
  const reviewerId = createdReviewer.data.data['_id']
  const createdCompany = await company.createCompany(companyNotReviewedData)
  const companyId = createdCompany.data.data['_id']

  try {
    // check that this request must return an error
    expect(await reviewer.decideAnApplication(reviewerId, companyId, {})).toThrowError()
  } catch (err) {
    // check the status code
    const statusCode = err['response'].status
    expect(statusCode).toEqual(400)

    // check the custom error message
    const customError = err['response'].data
    expect(customError.status).toEqual('Error')
    expect(customError.message).toEqual('Decision not given')

    expect.assertions(3)
  }
}, 20000)

test('Decision string rejected', async () => {
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

    expect.assertions(3)
  }
}, 20000)

test('Not accepted by lawyer', async () => {
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

    expect.assertions(3)
  }
}, 20000)
