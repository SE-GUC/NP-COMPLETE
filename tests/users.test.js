const company = require('./company')
//const users = require('./users')

test('showEstanlishedCompanies exists', async () => {
  expect.assertions(1)
  expect(typeof (company.readCompany)).toBe('function')
})

// test('show all established comapnies details', async () => {
//   const firstCompanyData = {
//     name: 'GOOGLE',
//     establishmentDate: '1923-10-16',
//     type: 'SSC',
//     state: 'established',
//     form: {
//       data: [],
//       filledByLawyer: false,
//       paid: true
//     }
//   }
//   const secondCompnayData = {
//     name: 'MICROSOFT',
//     establishmentDate: '1950-11-19',
//     type: 'SPC',
//     state: 'established',
//     form: {
//       data: [],
//       comment: 'No comment',
//       filledByLawyer: true,
//       paid: true
//     }
//   }
//   const created1 = await company.createCompany(firstCompanyData)
//   const createdData1 = created1.data.data
//   const wantedData1 = {
//     establishmentDate: createdData1.establishmentDate,
//     name: createdData1.name,
//     type: createdData1.type
//   }
//   const created2 = await company.createCompany(secondCompnayData)
//   const createdData2 = created2.data.data
//   const wantedData2 = {
//     establishmentDate: createdData2.establishmentDate,
//     name: createdData2.name,
//     type: createdData2.type
//   }
//   const establishedCompanies = [wantedData1, wantedData2]
//   const read = await users.showEstanlishedCompanies()
//   const readData = read.data.data
//   expect.assertions(1)
//   expect(readData).toEqual(establishedCompanies)
// })
