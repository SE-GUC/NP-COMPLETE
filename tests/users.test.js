const company = require('./company')

test('showEstablishedCompanies exists', async () => {
  expect.assertions(1)
  expect(typeof (company.readCompany)).toBe('function')
})
