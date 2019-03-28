const lawyer = require('./lawyer')
const company = require('./company')
const investor = require('./investor')

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

test('Create-a-Lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.createLawyer)).toBe('function')
})

test('Create a lawyer', async () => {
  const data = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07T00:00:00.000Z',
    email: 'mohamedyasser0000@gmail.com',
    startDate: '2016-06-06T00:00:00.000Z'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
})

test('Update-a-Lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.updateLawyer)).toBe('function')
})

test('Update a Lawyer by id', async () => {
  const data = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07',
    email: 'mohamedyasser0000@gmail.com',
    startDate: '2016-06-06'
  }

  const dataToUpdate = {
    email: 'mohamed.tarawa@gmail.com'
  }

  const dataUpdated = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07T00:00:00.000Z',
    email: 'mohamed.tarawa@gmail.com',
    startDate: '2016-06-06T00:00:00.000Z'
  }

  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await lawyer.updateLawyer(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
})

test('View-a-form exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.viewForm)).toBe('function')
},
10000)

test('View a form by investor id', async () => {
  const investorData = {
    fullName: 'Sam Water',
    birthdate: '1837-02-15',
    email: 'great@guy.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    investorId: id,
    name: 'myCo',
    type: 'SSC',
    accepted: false
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const returnedData = await lawyer.viewForm(id)

  const expectedResult = `Company: myCo has form: ['cairo', 23, 5555], `
  console.log(returnedData)
  console.log(expectedResult)
  return expect(returnedData).toEqual(expectedResult)
}, 10000)

// User story 5.06 - update profile
test('Update-mu-profile exists', async () => {
  expect.assertions(1)
  expect(typeof (lawyer.updateMyProfile)).toBe('function')
},
10000)
