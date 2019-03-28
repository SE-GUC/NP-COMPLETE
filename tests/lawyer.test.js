const lawyer = require('./lawyer')
const company = require('./company')

//! Needs to test Default

test('Read-a-Laywer exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.readLawyer)).toBe('function')
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
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})

test('Delete-a-Lawyer exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.deleteLawyer)).toBe('function')
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
  const deletedData = deleted.data.deletedLawyer
  expect.assertions(1)
  return expect(deletedData).toEqual(createdData)
})

test('Fill a form by lawyer exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.FillForm)).toBe('function')
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
  expect.assertions(1)
  return expect(newcompanyData).toEqual(createdData)
})

test('Create-a-Lawyer exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.createLawyer)).toBe('function')
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
  expect.assertions(1)
  return expect(createdData).toMatchObject(data)
})

test('Update-a-Lawyer exists', async () => {
  expect.assertions(1)
  return expect(typeof (lawyer.updateLawyer)).toBe('function')
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
  expect.assertions(1)
  return expect(updatedData).toMatchObject(dataUpdated)
})
