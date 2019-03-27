const task = require('./task')

test('Read-multiple-Tasks exists', async () => {
  expect.assertions(1)
  return expect(typeof (task.default)).toBe('function')
})

test('Read multiple Tasks by id', async () => {
  const data = {
    department: 'Lawyer',
    creationDate: '1837-02-15',
    deadline: '1998-02-15'
  }
  const data1 = {
    department: 'Lawyer',
    creationDate: '1837-02-15',
    deadline: '1998-02-15'
  }
  const created = await task.createTask(data)
  const created1 = await task.createTask(data1)
  const createdData = created.data.data
  const createdData1 = created1.data.data
  const read = await task.default()
  const readData = read.data.data[0]
  const readData1 = read.data.data[1]
  expect.assertions(1)
  return (expect(readData).toEqual(createdData) && expect(readData1).toEqual(createdData1))
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
  return expect(readData).toEqual(createdData)
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
  return expect(deletedData).toEqual(createdData)
})
