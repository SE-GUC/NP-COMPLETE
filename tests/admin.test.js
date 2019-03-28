const admin = require('./admin')
const company = require('./company')

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
},
10000)

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
  /*
  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: true,
      paid: false
    },
    name: 'test',
    type: 'SSC',
    accepted: false
  }
  */
  const createdAdmin = await admin.createAdmin(adminData)
  const createdAdminData = createdAdmin.data.data
  const adminId = createdAdminData['_id']
  const adminViewedCases = await admin.viewCases(adminId)
  console.log(adminViewedCases)
  // const createdCompany = await company.createCompany(companyData)
  const availableCompaniesData = await company.default()
  console.log(availableCompaniesData)
  return expect(adminViewedCases).toEqual(availableCompaniesData)
})
