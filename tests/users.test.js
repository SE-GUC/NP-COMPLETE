const company = require('./company')

test('showEstanlishedCompanies exists', async () => {
  expect.assertions(1)
  expect(typeof (company.readCompany)).toBe('function')
})
