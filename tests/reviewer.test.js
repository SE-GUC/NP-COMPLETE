const reviewer = require('./reviewer')
const company = require('./company')

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
