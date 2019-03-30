const company = require('./company')

test('Create-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.createCompany)).toBe('function')
})

test('Create a Company', async () => {
  const data = {
    name: 'AUCCC',
    type: 'FCB',
    form: {
      data: []
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const data2 = {
    form: {
      data: [],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    name: 'AUCCC',
    type: 'FCB',
    accepted: false,
    state: 'pending'
  }

  expect.assertions(1)
  return expect(createdData).toMatchObject(data2)
})

test('Update a company', async () => {
  expect.assertions(1)
  return expect(typeof (company.updateCompany)).toBe('function')
})
test('Update a company by id', async () => {
  const data = {
    name: 'Nike',
    type: 'SSC',
    form: {
      data: []
    }
  }

  const dataToUpdate = {
    name: 'Testttt',
    type: 'SPC'
  }

  const dataUpdated = {
    name: 'Testttt',
    type: 'SPC',
    form: {
      data: []
    }
  }

  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await company.updateCompany(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  return expect(updatedData).toMatchObject(dataUpdated)
})

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
    type: 'SSC',
    form: {
      data: []
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await company.readCompany(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toMatchObject(data)
})

test('Delete-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.deleteCompany)).toBe('function')
},
10000)

test('Delete a Company by id', async () => {
  const data = {
    name: 'Disney',
    type: 'SSC',
    form: {
      data: []
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await company.deleteCompany(id)
  const deletedData = deleted.data.deletedCompany
  expect.assertions(1)
  return expect(deletedData).toMatchObject(data)
})
