const company = require('./company')

test('Create-a-Company exists', async () => {
  expect.assertions(1)
  return expect(typeof (company.createCompany)).toBe('function')
}
, 10000)

test('Create a Company', async () => {
  const data = {
    name: 'Nike',
    establishmentDate: '1837-02-15',
    type: 'SSC',
    state: 'established',
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
  const created = await company.createCompany(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await company.readCompany(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})
