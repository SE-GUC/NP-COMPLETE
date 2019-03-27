const admin = require('./admin')

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
  return expect(createdData).toMatchObject(data)
})

test('Update a Reviewer by id', async () => {
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
  return expect(updatedData).toMatchObject(dataUpdated)
})
