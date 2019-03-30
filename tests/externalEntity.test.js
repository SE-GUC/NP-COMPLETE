const externalEntity = require('./externalEntity')
const task = require('./task')

jest.setTimeout(180000)
test('Create-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.createExternalEntity)).toBe('function')
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
  expect(createdData).toMatchObject(data)
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
    phone: 12121212
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await externalEntity.readExternalEntity(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
})

test('Update-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.updateExternalEntity)).toBe('function')
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
  expect(updatedData).toMatchObject(dataUpdated)
})

test('Delete-an-External-Entity exists', async () => {
  expect.assertions(1)
  expect(typeof (externalEntity.default)).toBe('function')
})

/*
test('Delete an External Entity by id', async () => {
  const data = {
    name: 'Unlucky one',
    email: 'unlucky@kokowawa.com',
    phone: 1331313
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await externalEntity.deleteExternalEntity(id)
  const deletedData = deleted.data.deleteExternalEntity
  expect.assertions(1)
  return expect(createdData).toEqual(deletedData)
})
*/

test('Delete an External Entity by id', async () => {
  const data = {
    name: 'Unlucky one',
    email: 'unlucky@kokowawa.com',
    phone: 1331313
  }
  const created = await externalEntity.createExternalEntity(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await externalEntity.deleteExternalEntity(id)
  const deletedData = deleted.data.deletedExternalEntity
  // console.log(deleted)
  // console.log(deleted.data)
  // console.log(deleted.data.deletedExternalEntity)
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})
