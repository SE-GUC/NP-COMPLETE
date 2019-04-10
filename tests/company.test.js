const company = require('./company')

test('Create-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.createCompany)).toBe('function')
})

test('Create a Company', async () => {
  const data = {
    name: 'Nike',
    establishmentDate: '1837-02-15T00:00:00.000Z',
    type: 'SSC',
    state: 'Established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: []
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const companyId = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await company.deleteCompany(companyId)
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
  const companyId = createdData['_id']
  const updated = await company.updateCompany(companyId, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
  await company.deleteCompany(companyId)
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
  const companyId = createdData['_id']
  const read = await company.readCompany(companyId)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toMatchObject(data)
  await company.deleteCompany(companyId)
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
  const deletedData = deleted.data.deleted
  expect.assertions(1)
  expect(deletedData).toMatchObject(data)
})
