const admin = require('./admin')
const company = require('./company')
const task = require('./task')

jest.setTimeout(180000)

test('read-multiple-Admins exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.default)).toBe('function')
})

test('Create-an-Admin exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.createAdmin)).toBe('function')
})

test('Create an admin', async () => {
  const data = {
    fullName: 'Jane Doe',
    birthdate: '1995-05-05T00:00:00.000Z',
    email: 'jane-doe@gmail.com',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const created = await admin.createAdmin(data)
  const createdData = created.data.data
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
})

test('Update-an-Admin exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.updateAdmin)).toBe('function')
})

test('Update an Admin by id', async () => {
  const data = {
    fullName: 'Jane Doe',
    birthdate: '1995-05-05',
    email: 'jane-doe@gmail.com',
    startDate: '2019-02-02'
  }

  const dataToUpdate = {
    birthdate: '1997-05-05'
  }

  const dataUpdated = {
    fullName: 'Jane Doe',
    birthdate: '1997-05-05T00:00:00.000Z',
    email: 'jane-doe@gmail.com',
    startDate: '2019-02-02T00:00:00.000Z'
  }

  const created = await admin.createAdmin(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await admin.updateAdmin(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(dataUpdated)
})

test('Read-an-Admin exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.readAdmin)).toBe('function')
})

test('Read an Admin by id', async () => {
  const data = {
    fullName: 'Sam Water',
    birthdate: '1837-02-15',
    email: 'balabizo@test.com',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const created = await admin.createAdmin(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await admin.readAdmin(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
})

test('Delete-an-Admin exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.deleteAdmin)).toBe('function')
})

test('Delete an Admin by id', async () => {
  const data = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const created = await admin.createAdmin(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await admin.deleteAdmin(id)
  const deletedData = deleted.data.deletedAdmin
  expect.assertions(1)
  expect(deletedData).toEqual(createdData)
})

// User story 4.09 - view All cases (Companies) on the system
test('Admin view cases by id', async () => {
  const adminData = {
    fullName: 'John Smith',
    birthdate: '1996-10-02',
    email: 'mko@tower.net',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const createdAdmin = await admin.createAdmin(adminData)
  const createdAdminData = createdAdmin.data.data
  const adminId = createdAdminData['_id']
  const adminViewedCases = await admin.viewCases(adminId)
  const adminViewedCasesData = adminViewedCases.data.data
  const availableCompanies = await company.default()
  const availableCompaniesData = availableCompanies.data.data
  expect.assertions(1)
  expect(adminViewedCasesData).toEqual(availableCompaniesData)
})

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.

// Test that the function exists
test('View-my-department-tasks exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.viewDepartmentTasks)).toBe('function')
})

// Test the functionalty
test('Admin view his department tasks by id', async () => {
  const adminData = {
    fullName: 'John Smith',
    birthdate: '1996-10-02',
    email: 'mko@tower.net',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const createdAdmin = await admin.createAdmin(adminData)
  const createdAdminData = createdAdmin.data.data
  const adminId = createdAdminData['_id']
  // console.log('nooooooooooooooo')
  const adminDepartmentTasks = await admin.viewDepartmentTasks(adminId)
  // console.log('niceeeeeeeeeeeee')
  const adminDepartmentTasksData = adminDepartmentTasks.data.data
  // const depart = {department:'Admin'}
  const myDepartmentTasks = await task.viewDepartmentTask({department:'Admin'})
  const myDepartmentTasksData = myDepartmentTasks.data.data
  expect.assertions(1)
  expect(adminDepartmentTasksData).toEqual(myDepartmentTasksData)
})
