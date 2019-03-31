const company = require('./company')

const admin = require('./admin')

// beforeEach(() => {
//   admin.deleteAll()
//  });
 
//  afterEach(() => {
//    admin.deleteAll()
//   });

test('Create-a-Company exists', async () => {    
  expect.assertions(1)
  return expect(typeof (company.createCompany)).toBe('function')
  })

test('Create a Company', async () => {    
  const data = {
    name: 'Nike',
    establishmentDate: '1837-02-15T00:00:00.000Z',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: []
    }
  }
  const created = await company.createCompany(data)
  const createdData = created.data.data
  expect.assertions(1)
  return expect(createdData).toMatchObject(data)
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
