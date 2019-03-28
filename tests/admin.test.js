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
  const createdAdmin = await admin.createAdmin(adminData)
  const createdAdminData = createdAdmin.data.data
  const adminId = createdAdminData['_id']
  const adminViewedCases = await admin.viewCases(adminId)
  const adminViewedCasesData = adminViewedCases.data.data
  const availableCompanies = await company.default()
  const availableCompaniesData = availableCompanies.data.data
  expect(adminViewedCasesData).toEqual(availableCompaniesData)
})

// user story 4.07 part 1
test('Publish a company exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.publishCompany)).toBe('function')
})

// user story 4.07 part 2
test('Publish a company by id', async () => {
  const data = {
    name: 'Nike',
    establishmentDate: '1837-02-15',
    type: 'SSC',
    state: 'pending',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const companyCreated = await company.createCompany(data)
  const createdCompanyData = companyCreated.data.data
  const companyId = createdCompanyData['_id']

  const publishedCompany = await admin.publishCompany(companyId)
  const datenow = new Date(Date.now())
  datenow.setMilliseconds(0)
  datenow.setSeconds(0)
  datenow.setMinutes(0)
  const updatedData = {
    name: 'Nike',
    establishmentDate: datenow.toISOString(),
    type: 'SSC',
    state: 'published',
    accepted: true,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    },
    __v: 0,
    _id: companyId
  }

  const publishedCompanyData = publishedCompany.data.data

  expect.assertions(1)
  expect(publishedCompanyData).toMatchObject(updatedData)
})

// User story 5.06 - update profile
test('Update-my-profile exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.updateMyProfile)).toBe('function')
},
10000)
