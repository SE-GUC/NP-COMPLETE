const lawyer = require('./lawyer')

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
