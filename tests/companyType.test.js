const companyType = require('./companyType')

test('default exists', async () => {
  expect.assertions(1)
  return expect(typeof (companyType.default)).toBe('function')
})

test('Create-a-CompanyType exists', async () => {
  expect.assertions(1)
  return expect(typeof (companyType.createCompanyType)).toBe('function')
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
  return expect(createdData).toMatchObject(data)
})

test('Update-an-Admin exists', async () => {
  expect.assertions(1)
  return expect(typeof (companyType.updateCompanyType)).toBe('function')
})

test('Update an Company Type by id', async () => {
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
  return expect(updatedData).toMatchObject(dataUpdated)
})
