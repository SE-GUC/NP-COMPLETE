const company = require('./company')
const task = require('./task')
jest.setTimeout(180000)

const admin = require('./admin')

// beforeEach(() => {
//   admin.deleteAll()
//  });

//  afterEach(() => {
//    admin.deleteAll()
//   });

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

test('Assign-Deadline exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.assignDeadline)).toBe('function')
})

test('Assign Deadline', async () => {
  const data = {
    fullName: 'Jane Doe',
    birthdate: '1995-05-05',
    email: 'jane-doe@gmail.com',
    startDate: '2019-02-02'
  }
  const created = await admin.createAdmin(data)
  const createdData = created.data.data
  const id = createdData['_id']

  const modifiedTask = {
    department: 'Lawyer',
    creationDate: '2018-02-02',
    deadline: '2019-02-02'
  }

  const oldTask = await task.createTask(modifiedTask)
  const oldTaskData = oldTask.data.data
  const tId = oldTaskData['_id']
  const newData = {
    TaskID: tId,
    deadline: '2019-03-03'
  }
  const nowTask = await admin.assignDeadline(id, newData)

  const newTask = {
    department: 'Lawyer',
    creationDate: '2018-02-02T00:00:00.000Z',
    deadline: '2019-03-03T00:00:00.000Z'
  }
  const nowTaskData = nowTask.data.data
  expect.assertions(1)
  expect(nowTaskData).toMatchObject(newTask)
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
    expect(adminViewedCasesData).toMatchObject(availableCompaniesData)
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
  const adminDepartmentTasks = await admin.viewDepartmentTasks(adminId)
  const adminDepartmentTasksData = adminDepartmentTasks.data.data
  const myDepartmentTasks = await task.viewDepartmentTask({ department: 'Admin' })
  const myDepartmentTasksData = myDepartmentTasks.data.data
  expect.assertions(1)
  expect(adminDepartmentTasksData).toEqual(myDepartmentTasksData)
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
  await company.deleteCompany(companyId)

  expect.assertions(1)
  expect(publishedCompanyData).toMatchObject(updatedData)
})

// User story 5.06 - update profile
test('Update-my-profile exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.updateMyProfile)).toBe('function')
},
10000)

// user story 2.04 part 1
test('getFeedback exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.getFeedback)).toBe('function')
})

// user story 2.04 part 2
test('getFeedback of investors by admin', async () => {
  const data = {
    'form': {
      'data': [
        'cairo',
        23,
        5555
      ],
      'acceptedByLawyer': -1,
      'acceptedByReviewer': -1,
      'filledByLawyer': false,
      'paid': false
    },
    'investorId': '5c9f4a53df42f6a988998b59',
    'name': 'myCo',
    'type': 'SSC',
    'accepted': false,
    'feedback': 'hello'
  }
  const data1 = {
    'form': {
      'data': [
        'cairo',
        23,
        5555
      ],
      'acceptedByLawyer': -1,
      'acceptedByReviewer': -1,
      'filledByLawyer': false,
      'paid': false
    },
    'investorId': '5c9f4a53df42f6a988998b59',
    'name': 'myCo',
    'type': 'SSC',
    'accepted': false,
    'feedback': 'hello'
  }
  const originalFeedback = data['feedback']
  const originalFeedback1 = data1['feedback']

  await company.createCompany(data)
  const feedbacks = await admin.getFeedback('1')
  const feedbacksData = feedbacks.data.data

  expect.assertions(1)
  expect(feedbacksData).toContain(originalFeedback1) && expect(feedbacksData).toContain(originalFeedback)
})
