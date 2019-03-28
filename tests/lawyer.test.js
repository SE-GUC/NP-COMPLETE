const lawyer = require('./lawyer')
const company = require('./company')

//! Needs to test Default

test('Read-a-Laywer exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.readLawyer)).toBe('function')
})

test('Read a Lawyer by id', async () => {
  const data = {
    fullName: 'Mortada Mansour',
    birthdate: '1980-02-26',
    email: 'great@guy.com',
    startDate: '2015-12-12'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await lawyer.readLawyer(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
})

test('Delete-a-Lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.deleteLawyer)).toBe('function')
},
12000)

test('Delete a Lawyer by id', async () => {
  const data = {
    fullName: 'Soul Goodman',
    birthdate: '1990-10-02',
    email: 'high@tower.net',
    startDate: '2018-07-20'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await lawyer.deleteLawyer(id)
  const deletedData = deleted.data.deletedLawyer
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})

test('Fill a form by lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.FillForm)).toBe('function')
},
10000)

test('Filling form by lawyer', async () => {
  const data = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: true,
      paid: false
    },
    name: 'test',
    type: 'SSC',
    accepted: false
  }
  const created = await lawyer.FillForm(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const newCompany = await company.readCompany(id)
  const newcompanyData = newCompany.data.data
  expect.assertions(1)
  expect(newcompanyData).toEqual(createdData)
})

test('addComment exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.addComment)).toBe('function')
},
10000)

test('Add Comment', async () => {
  const data = {
    comment: 'sjwmvj'
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
      acceptedByLawyer: 0,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false,
      lawyerID: '5c9a6888bca2114a80a5c124'
    }
  }
  const lawyerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }

  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const addedComment = await lawyer.addComment(lawyerId, companyId, data)
  const form = addedComment.data.data
  const comment = form['comment']
  expect.assertions(1)
  expect(comment).toEqual(data.comment)
})
