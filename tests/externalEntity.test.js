const externalEntity = require('./externalEntity')

test('Create-an-External-Entity exists', async () => {
  expect.assertions(1)
  return expect(typeof (externalEntity.createExternalEntity)).toBe('function')
})

test('Create an External Entity', async () => {
  const data = {
    name: 'Al Almanya l ebadat el 74arat',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  expect.assertions(1)
  return expect(createdData).toMatchObject(data)
})

test('Update-an-External-Entity exists', async () => {
  expect.assertions(1)
  return expect(typeof (externalEntity.updateExternalEntity)).toBe('function')
})

test('Update an External Entity by id', async () => {
  const data = {
    name: 'nice',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034
  }

  const dataToUpdate = {
    name: 'please'
  }

  const dataUpdated = {
    name: 'please',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034
  }

  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await externalEntity.updateExternalEntity(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  return expect(updatedData).toMatchObject(dataUpdated)
})
