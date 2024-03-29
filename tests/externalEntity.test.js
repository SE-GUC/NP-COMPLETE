const externalEntity = require('./externalEntity')

jest.setTimeout(10000)

test('Create-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.createExternalEntity)).toBe('function')
})

test('Create an External Entity', async () => {
  const data = {
    name: 'Al Almanya l ebadat el 74arat',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034,
    feesMin: 200,
    feesMax: 20000,
    feesPercentage: 50,
    url: 'asdgsaksnm'
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await externalEntity.deleteExternalEntity(id)
})

test('Read-all-External-Entities exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.default)).toBe('function')
})

test('Read-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.readExternalEntity)).toBe('function')
})

test('Read an External entity', async () => {
  const data = {
    name: 'El masatil',
    email: 'mastol@kokowawa.com',
    phone: 12121212,
    feesMin: 200,
    feesMax: 20000,
    feesPercentage: 50,
    url: 'asdfasdf'
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await externalEntity.readExternalEntity(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
  await externalEntity.deleteExternalEntity(id)
})

test('Update-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.updateExternalEntity)).toBe('function')
})

test('Update an External Entity by id', async () => {
  const data = {
    name: 'nice',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034,
    feesMin: 200,
    feesMax: 20000,
    feesPercentage: 50,
    url: 'asdfasdf'
  }

  const dataToUpdate = {
    name: 'please'
  }

  const dataUpdated = {
    name: 'please',
    email: 'Al_almanya@kokowawa.com',
    phone: 2323034,
    feesMin: 200,
    feesMax: 20000,
    feesPercentage: 50,
    url: 'asdfasdf'
  }

  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await externalEntity.updateExternalEntity(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
  await externalEntity.deleteExternalEntity(id)
})

test('Delete-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.deleteExternalEntity)).toBe('function')
})

test('Delete an External Entity by id', async () => {
  const data = {
    name: 'Unlucky one',
    email: 'unlucky@kokowawa.com',
    phone: 1331313,
    feesMin: 200,
    feesMax: 20000,
    feesPercentage: 50,
    url: 'asdfasdf'
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await externalEntity.deleteExternalEntity(id)
  const deletedData = deleted.data.deleted
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})
