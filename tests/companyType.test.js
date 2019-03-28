const companyType = require('./companyType')

test('Create-a-CompanyType exists', async () => {
  expect.assertions(1)
  expect(typeof (companyType.createCompanyType)).toBe('function')
})

test('Create a companyType', async () => {
  const data = {
    companyType: 'Type1',
    fields: ['stringField', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()']
  }
  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
})

test('Update-a-companyType exists', async () => {
  expect.assertions(1)
  expect(typeof (companyType.updateCompanyType)).toBe('function')
})

test('Update a Company Type by id', async () => {
  const data = {
    companyType: 'Type1',
    fields: ['stringField', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()']
  }

  const dataToUpdate = {
    fields: ['newfield', 'true', '123']
  }

  const dataUpdated = {
    companyType: 'Type1',
    fields: ['newfield', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await companyType.updateCompanyType(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
})

test('read-a-companyType exists', async () => {
  expect.assertions(1)
  expect(typeof (companyType.readCompanyType)).toBe('function')
})

test('read a Company Type by id', async () => {
  const data = {
    companyType: 'Type1',
    fields: ['stringField', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await companyType.readCompanyType(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
})

test('delete-a-companyType exists', async () => {
  expect.assertions(1)
  expect(typeof (companyType.deleteCompanyType)).toBe('function')
})

test('delete a CompanyType by id', async () => {
  const data = {
    companyType: 'Type1',
    fields: ['stringField', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await companyType.deleteCompanyType(id)
  const deletedData = deleted.data.data
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})
