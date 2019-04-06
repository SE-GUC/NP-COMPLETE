const companyType = require('./companyType')

test('default exists', async () => {
  expect.assertions(1)
  return expect(typeof (companyType.default)).toBe('function')
})

test('Create-a-CompanyType exists', async () => {
  expect.assertions(1)
  expect(typeof (companyType.createCompanyType)).toBe('function')
})

test('Create a companyType', async () => {
  const data = {
    companyType: 'Type1',
    fields: ['stringField', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['description1', 'description2', 'description3']
  }
  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const companyTypeId = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await companyType.deleteCompanyType(companyTypeId)
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
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['description1', 'description2', 'description3']
  }

  const dataToUpdate = {
    fields: ['newfield', 'true', '123']
  }

  const dataUpdated = {
    companyType: 'Type1',
    fields: ['newfield', 'true', '123'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['description1', 'description2', 'description3']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await companyType.updateCompanyType(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
  await companyType.deleteCompanyType(id)
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
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['description1', 'description2', 'description3']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await companyType.readCompanyType(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
  await companyType.deleteCompanyType(id)
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
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['description1', 'description2', 'description3']
  }

  const created = await companyType.createCompanyType(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await companyType.deleteCompanyType(id)
  const deletedData = deleted.data.data
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})
