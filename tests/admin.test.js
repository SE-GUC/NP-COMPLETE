const company = require('./company')
const task = require('./task')
jest.setTimeout(180000)

const admin = require('./admin')

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
  const id = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await admin.deleteAdmin(id)
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
    deadline: '2019-02-02',
    description: 'Legal writing'
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
    deadline: '2019-03-03T00:00:00.000Z',
    description: 'Legal writing'
  }
  const nowTaskData = nowTask.data.data
  expect.assertions(1)
  expect(nowTaskData).toMatchObject(newTask)
  await admin.deleteAdmin(id)
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
  await admin.deleteAdmin(id)
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
  await admin.deleteAdmin(id)
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
  const deletedData = deleted.data.deleted
  expect.assertions(1)
  await expect(deletedData).toEqual(createdData)
})
test('ViewCases exists', async () => {
  expect.assertions(1)
  expect(typeof (admin.viewCases)).toBe('function')
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
  await admin.deleteAdmin(adminId)
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
  await admin.deleteAdmin(adminId)
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
    state: 'Pending',
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
    state: 'Established',
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
  await company.deleteCompany(companyId)
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
    form: {
      data: [
        'cairo',
        23,
        5555
      ],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    name: 'myCo',
    type: 'SSC',
    accepted: false,
    feedback: 'hello'
  }
  const data1 = {
    form: {
      data: [
        'cairo',
        23,
        5555
      ],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    name: 'myCo',
    type: 'SSC',
    accepted: false,
    feedback: 'hello'
  }
  const originalFeedback = data['feedback']
  const originalFeedback1 = data1['feedback']

  await company.createCompany(data)
  await company.createCompany(data1)
  const feedbacks = await admin.getFeedback('1')
  const feedbacksData = feedbacks.data.data

  expect(feedbacksData).toContain(originalFeedback1)
  expect(feedbacksData).toContain(originalFeedback)
  expect.assertions(2)
})

test('Admin workPage-exists', async () => {
  expect.assertions(1)
  return expect(typeof (admin.workPage)).toBe('function')
})

test('Admin workPage', async () => {
  const adminData = {
    fullName: 'Elliot Alderson',
    birthdate: '1995-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02'
  }
  const createdAdmin = await admin.createAdmin(adminData)
  const createdAdminData = createdAdmin.data.data
  const adminId = createdAdminData._id

  const taskData = {
    department: 'Admin',
    creationDate: '2019-02-02T00:00:00.000Z',
    deadline: '2019-02-06T00:00:00.000Z',
    handler: [adminId],
    description: 'Admin work'
  }

  const createdTask = await task.createTask(taskData)
  const createdTaskData = createdTask.data.data
  const taskId = createdTaskData._id
  const taskhandler = createdTaskData['handler']

  const adminWorkPage = await admin.workPage(adminId)
  const adminWorkPageData = adminWorkPage.data.data[0].handler[0]
  expect.assertions(1)
  expect(adminWorkPageData).toEqual(taskhandler[0])
  await admin.deleteAdmin(adminId)
  await task.deleteTask(taskId)
})
