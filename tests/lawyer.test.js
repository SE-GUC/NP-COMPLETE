const lawyer = require('./lawyer')
const company = require('./company')
const investor = require('./investor')
const task = require('./task')

test('Read-a-Laywer exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.readLawyer)).toBe('function')
})
test('Read a Lawyer by id', async () => {
  const data = {
    fullName: 'Mortada Mansour',
    birthdate: '1980-02-26',
    email: 'great@guy.com',
    startDate: '2015-12-12'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await lawyer.readLawyer(id)
  const readData = read.data.data
  expect.hasAssertions()
  expect(readData).toEqual(createdData)
  await lawyer.deleteLawyer(id)
}, 1500000)

test('Delete-a-Lawyer exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.deleteLawyer)).toBe('function')
},
12000)

test('Delete a Lawyer by id', async () => {
  const data = {
    fullName: 'Soul Goodman',
    birthdate: '1990-10-02',
    email: 'high@tower.net',
    startDate: '2018-07-20'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await lawyer.deleteLawyer(id)
  const deletedData = deleted.data.deleted
  expect.hasAssertions()
  expect(deletedData).toEqual(createdData)
}, 10000)

test('decideAForm exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.decideAForm)).toBe('function')
})

// starts
test('Accepting a form by company id, not reviewed before', async () => {
  const lawyerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const data = {
    acceptedByLawyer: 1,
    comment: 'Hi'
  }
  const companyData = {
    name: 'SWVL',
    type: 'SSC',
    form: {
      data: [],
      comment: 'No comment',
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    }
  }

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const form = await lawyer.decideAForm(lawyerId, companyId, data)
  const reviewed = form.data.data['acceptedByLawyer']
  const id = form.data.data['lawyerID']
  expect.hasAssertions()
  expect(id).toEqual(lawyerId)
  expect(reviewed).toEqual(1)
  await lawyer.deleteLawyer(lawyerId)
  await company.deleteCompany(companyId)
}, 20000)

test('Rejecting an application by company id', async () => {
  const lawyerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const data = {
    acceptedByLawyer: 0,
    comment: 'Bad'
  }
  const companyData = {
    name: 'Disney',
    type: 'SSC',
    form: {
      data: [],
      comment: 'No comment',
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    }
  }

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const form = await lawyer.decideAForm(lawyerId, companyId, data)
  const reviewed = form.data.data['acceptedByLawyer']
  expect.hasAssertions()
  expect(reviewed).toBe(0)
  await lawyer.deleteLawyer(lawyerId)
  await company.deleteCompany(companyId)
}, 20000)

test('Fill a form by lawyer exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.FillForm)).toBe('function')
},
10000)

test('Filling form by lawyer', async () => {
  const data = {
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
  const created = await lawyer.FillForm(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const newCompany = await company.readCompany(id)
  const newcompanyData = newCompany.data.data
  expect.hasAssertions()
  expect(newcompanyData).toEqual(createdData)
})

test('addComment exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.addComment)).toBe('function')
},
10000)

test('Add Comment', async () => {
  const data = {
    comment: 'sjwmvj'
  }

  const companyData = {
    name: 'Disney',
    establishmentDate: '1923-10-16T00:00:00.000Z',
    type: 'SSC',
    state: 'Pending',
    accepted: false,
    investorId: '5c9614f2fe51f5258ce36f91',
    form: {
      data: [],
      comment: 'No comment',
      acceptedByLawyer: 0,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false,
      lawyerID: '5c9a6888bca2114a80a5c124'
    }
  }
  const lawyerData = {
    fullName: 'Mostafa test',
    birthdate: '1888-02-15',
    email: 'Notsogreat@guy.com',
    startDate: '1998-10-02'
  }

  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const createdCompany = await company.createCompany(companyData)
  const createdCompData = createdCompany.data.data
  const companyId = createdCompData['_id']

  const addedComment = await lawyer.addComment(lawyerId, companyId, data)
  const form = addedComment.data.data
  const comment = form['comment']
  expect.hasAssertions()
  expect(comment).toEqual(data.comment)
  await company.deleteCompany(companyId)
  await lawyer.deleteLawyer(lawyerId)
})

test('Create-a-Lawyer exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.createLawyer)).toBe('function')
})

test('Create a lawyer', async () => {
  const data = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07T00:00:00.000Z',
    email: 'mohamedyasser0000@gmail.com',
    startDate: '2016-06-06T00:00:00.000Z'
  }
  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const lawyerId = createdData._id
  expect.hasAssertions()
  expect(createdData).toMatchObject(data)
  await lawyer.deleteLawyer(lawyerId)
})

test('Update-a-Lawyer exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.updateLawyer)).toBe('function')
})

test('Update a Lawyer by id', async () => {
  const data = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07',
    email: 'mohamedyasser0000@gmail.com',
    startDate: '2016-06-06'
  }

  const dataToUpdate = {
    email: 'mohamed.tarawa@gmail.com'
  }

  const dataUpdated = {
    fullName: 'Mohamed Yasser Tarawa',
    birthdate: '1998-06-07T00:00:00.000Z',
    email: 'mohamed.tarawa@gmail.com',
    startDate: '2016-06-06T00:00:00.000Z'
  }

  const created = await lawyer.createLawyer(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const updated = await lawyer.updateLawyer(id, dataToUpdate)
  const updatedData = updated.data.data
  expect.hasAssertions()
  expect(updatedData).toMatchObject(dataUpdated)
  await lawyer.deleteLawyer(id)
})

test('View-a-form exists', async () => {
  expect.hasAssertions()
  return expect(typeof (lawyer.viewForm)).toBe('function')
},
10000)

test('View a form by investor id', async () => {
  const investorData = {
    fullName: 'Sam Water',
    birthdate: '1837-02-15',
    email: 'great@guy.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    investorId: id,
    name: 'myCo',
    type: 'SSC',
    accepted: false
  }
  const createdCompany1 = await company.createCompany(companyData)
  const createCompanyData1 = createdCompany1.data.data
  const companyId1 = createCompanyData1._id
  const companyData2 = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    investorId: id,
    name: 'myCo2',
    type: 'SSC',
    accepted: false
  }
  const createdCompany2 = await company.createCompany(companyData2)
  const createCompanyData2 = createdCompany2.data.data
  const companyId2 = createCompanyData2._id
  const returnedData = await lawyer.viewForm(id)
  const returnedFormsData = returnedData.data.data
  const expectedResult = `Company: myCo has form: cairo,23,5555, Company: myCo2 has form: cairo,23,5555, `
  expect.hasAssertions()
  expect(expectedResult).toEqual(returnedFormsData)
  await investor.deleteInvestor(id)
  await company.deleteCompany(companyId1)
  await company.deleteCompany(companyId2)
}, 10000)

test('Edit Form exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.editForm)).toBe('function')
})

test('Edit Form declined by Reviewer', async () => {
  const lawyerData = {
    fullName: 'Omar Ayman Abdelmagied',
    birthdate: '1998-09-07',
    email: 'omar@valid.com',
    startDate: '2010-02-02'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const companyData = {
    name: 'np-complete',
    type: 'SSC',
    form: {
      data: ['hello', 'world'],
      filledByLawyer: true,
      paid: false,
      acceptedByLawyer: 0
    }
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']

  const data = {
    data: ['form', 'edited']
  }
  const updatedCompany = await lawyer.editForm(lawyerId, companyId, data)
  const updatedCompanyForm = updatedCompany.data.updatedCompany.form

  expect.hasAssertions()
  expect(updatedCompanyForm.data).toEqual(data.data)
  expect(updatedCompanyForm.acceptedByLawyer).toBe(1)
  await lawyer.deleteLawyer(lawyerId)
  await company.deleteCompany(companyId)
})

// User story 5.06 - update profile
test('Update-my-profile exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.updateMyProfile)).toBe('function')
},
10000)

// As an Internal User I should be able to view tasks assigned to my department, so that I can be aware of coworkers updates.

// Test that the function exists
test('View-my-department-tasks exists', async () => {
  expect.hasAssertions()
  expect(typeof (lawyer.viewDepartmentTasks)).toBe('function')
})

// Test the functionalty
test('Lawyer view his department tasks by id', async () => {
  const lawyerData = {
    fullName: 'John Smith',
    birthdate: '1996-10-02',
    email: 'mko@tower.net',
    startDate: '2019-02-02T00:00:00.000Z'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']
  const lawyerDepartmentTasks = await lawyer.viewDepartmentTasks(lawyerId)
  const lawyerDepartmentTasksData = lawyerDepartmentTasks.data.data
  const myDepartmentTasks = await task.viewDepartmentTask({ department: 'Lawyer' })
  const myDepartmentTasksData = myDepartmentTasks.data.data
  expect.hasAssertions()
  expect(lawyerDepartmentTasksData).toEqual(myDepartmentTasksData)
  await lawyer.deleteLawyer(lawyerId)
})

// As an Internal User I should be able to view all the cases in the system so that I can open them and check their details

// Test the function exists
test('View-Cases-exists', async () => {
  expect.hasAssertions()
  return expect(typeof (lawyer.casesPage)).toBe('function')
})

// Test the functionality
test('Lawyer view all cases', async () => {
  const lawyerData = {
    fullName: 'Elliot Alderson',
    birthdate: '1995-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']
  const lawyerViewedCases = await lawyer.casesPage(lawyerId)
  const lawyerViewedCasesData = lawyerViewedCases.data.data
  const availableCompanies = await company.default()
  const availableCompaniesData = availableCompanies.data.data
  expect.hasAssertions()
  expect(availableCompaniesData).toMatchObject(lawyerViewedCasesData)
  await lawyer.deleteLawyer(lawyerId)
}, 15000)

test('Lawyer workPage-exists', async () => {
  expect.hasAssertions()
  return expect(typeof (lawyer.workPage)).toBe('function')
})

test('Lawyer workPage', async () => {
  const lawyerData = {
    fullName: 'Elliot Alderson',
    birthdate: '1995-10-02',
    email: 'mrRobot@fsociety.com',
    startDate: '1998-12-02'
  }
  const createdLawyer = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = createdLawyer.data.data
  const lawyerId = createdLawyerData['_id']

  const taskData = {
    department: 'Lawyer',
    creationDate: '2019-02-02T00:00:00.000Z',
    deadline: '2019-02-06T00:00:00.000Z',
    handler: [lawyerId],
    description: 'Review legal documents'
  }

  const createdTask = await task.createTask(taskData)
  const createdTaskData = createdTask.data.data
  const taskhandler = createdTaskData['handler']
  const taskId = createdTaskData._id

  const lawyerWorkPage = await lawyer.workPage(lawyerId)
  const lawyerWorkPageData = lawyerWorkPage.data.data[0].handler[0]
  expect.hasAssertions()
  expect(lawyerWorkPageData).toEqual(taskhandler[0])
  await lawyer.deleteLawyer(lawyerId)
  await task.deleteTask(taskId)
})
