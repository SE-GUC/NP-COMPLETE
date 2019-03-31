const company = require('./company')

const admin = require('./admin')

// beforeEach(() => {
//  admin.deleteAll()
// });

// afterEach(() => {
//   admin.deleteAll()
//  });

test('showEstablishedCompanies exists', async () => {    
  expect.assertions(1)
  expect(typeof (company.readCompany)).toBe('function')
 })
