const task = require('./task')

test('Read-multiple-Tasks exists', async () => {
  expect.assertions(1)
  return expect(typeof (task.default)).toBe('function')
})

test('Read-a-Task exists', async () => {
  expect.assertions(1)
  return expect(typeof (task.readTask)).toBe('function')
})

test('Read a Task by id', async () => {
  const data = {
    department: 'Lawyer',
    creationDate: '1837-02-15',
    deadline: '1998-02-15'
  }
  const created = await task.createTask(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await task.readTask(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
  await task.deleteTask(id)
})

test('Delete-a-Task exists', async () => {
  expect.assertions(1)
  return expect(typeof (task.deleteTask)).toBe('function')
},
10000)

test('Delete a Task by id', async () => {
  const data = {
    department: 'Admin',
    creationDate: '1837-02-15',
    deadline: '1998-02-15'
  }
  const created = await task.createTask(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await task.deleteTask(id)
  const deletedData = deleted.data.deletedTask
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})

test('Create-a-Task exists', async () => {
  expect.assertions(1)
  expect(typeof (task.createTask)).toBe('function')
})

test('Create a task', async () => {
  const data = {
    department: 'Lawyer',
    creationDate: '2019-01-01T00:00:00.000Z',
    deadline: '2019-02-02T00:00:00.000Z'
  }
  const created = await task.createTask(data)
  const createdData = created.data.data
  const id = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await task.deleteTask(id)
})

test('Update-a-Task exists', async () => {
  expect.assertions(1)
  expect(typeof (task.updateTask)).toBe('function')
})

test('Update a Task by id', async () => {
  const data = {
    department: 'Lawyer',
    creationDate: '2019-01-01',
    deadline: '2019-02-02'
  }

  const dataToUpdate = {
    deadline: '2019-03-03'
  }

  const dataUpdated = {
    department: 'Lawyer',
    creationDate: '2019-01-01T00:00:00.000Z',
    deadline: '2019-03-03T00:00:00.000Z'
  }

  const created = await task.createTask(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await task.updateTask(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
  await task.deleteTask(id)
})
