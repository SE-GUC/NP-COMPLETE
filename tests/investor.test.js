
const investor = require('./investor')
const company = require('./company')

//! Needs to test Default

test('Read-an-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.readInvestor)).toBe('function')
})

test('Read an Investor by id', async () => {
  const data = {
    fullName: 'Sam Water',
    birthdate: '1837-02-15',
    email: 'great@guy.com'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await investor.readInvestor(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})

test('Delete-an-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.deleteInvestor)).toBe('function')
},
10000)

test('Delete an Investor by id', async () => {
  const data = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await investor.deleteInvestor(id)
  const deletedData = deleted.data.deletedInvestor
  expect.assertions(1)
  return expect(deletedData).toEqual(createdData)
})

test('edit-form-by-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.editForm)).toBe('function')
})

test('edit a form by an Investor', async () => {
  const data = {
    data: [ 'cairo', 23, 2255 ]
  }
  const investorTest = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
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
    name: 'test',
    type: 'SSC',
    accepted: false
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  const updatedForm = await investor.editForm(data, companyId)
  const UpdatedFormData = updatedForm.data.updatedCompany.form.data
  expect.assertions(1)
  return expect(UpdatedFormData).toEqual(data.data)
})
