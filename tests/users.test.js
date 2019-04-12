const company = require('./company')

jest.setTimeout(10000)

test('showEstablishedCompanies exists', async () => {
  expect.assertions(1)
  expect(typeof (company.readCompany)).toBe('function')
})
