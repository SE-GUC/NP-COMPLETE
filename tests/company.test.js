const company = require('./company')

test('Default route exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.default)).toBe('function')
})

// Add default route test

test('Read-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.readCompany)).toBe('function')
})

test('Read a Company by id', async () => {
  const data = {
    name: 'Disney',
    establishmentDate: '1923-10-16T00:00:00.000Z',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'No comment',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await company.readCompany(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})

test('Delete-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.deleteCompany)).toBe('function')
},
10000)

test('Delete a Company by id', async () => {
  const data = {
    name: 'Disney',
    establishmentDate: '1923-10-16T00:00:00.000Z',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'No comment',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await company.deleteCompany(id)
  const deletedData = deleted.data.deletedCompany
  expect.assertions(1)
  return expect(deletedData).toEqual(createdData)
})
