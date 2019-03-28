const investor = require('./investor')
const company = require('./company')

//! Needs to test Default

test('Read-an-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.readInvestor)).toBe('function')
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
  expect(readData).toEqual(createdData)
})

test('Delete-an-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.deleteInvestor)).toBe('function')
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
  expect(deletedData).toEqual(createdData)
})

test('Create-an-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.createInvestor)).toBe('function')
})

test('Create-an-Investor', async () => {
  const data = {
    fullName: 'Anthony Martial',
    birthdate: '1996-12-20',
    email: 'hey@everyone.com'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await investor.readInvestor(id)
  const readData = read.data.data
  expect.assertions(1)
  expect(readData).toEqual(createdData)
})

test('Update-an-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.updateInvestor)).toBe('function')
})

test('Update an Investor by id', async () => {
  const data = {
    fullName: 'Bill Marks',
    birthdate: '1990-10-18',
    email: 'hello@world.com'
  }
  const createdInvestor = await investor.createInvestor(data)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const newData = {
    email: 'billmarks@yahoo.com' // used email as it's the most likely field to get updated
  }
  const updatedInfo = {
    fullName: 'Bill Marks',
    birthdate: '1990-10-18T00:00:00.000Z',
    email: 'billmarks@yahoo.com'
  }
  const updated = await investor.updateInvestor(newData, id)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(updatedInfo)
})

test('edit-form-by-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.editForm)).toBe('function')
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
  expect(UpdatedFormData).toEqual(data.data)
})

// As an investor I should be able to show a list for my peniding and established companies.
test('Get Companies Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.getCompanies)).toBe('function')
})

test('Get my companies', async () => {
  const investorData = {
    fullName: 'Naguib sawiris',
    birthdate: '1950-05-15',
    email: 'sawiris@gmail.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']
  const companyData1 = {
    name: 'Nike',
    establishmentDate: '1837-08-20',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: investorId,
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
  const companyData2 = {
    name: 'puma',
    establishmentDate: '1820-05-15',
    type: 'SPC',
    state: 'peniding',
    accepted: true,
    investorId: investorId,
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
  const company1 = await company.createCompany(companyData1)
  const firstCompany = company1.data.data
  const company2 = await company.createCompany(companyData2)
  const secondCompany = company2.data.data
  const expected = await investor.getCompanies(investorId)
  const expectedData = expected.data.data
  const myCompanies = [firstCompany, secondCompany]
  expect.assertions(1)
  expect(expectedData).toEqual(myCompanies)
}, 60000)
// As an investor I should be able to fill an application form, so that I can establish a company.
test('Fill Form Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.fillForm)).toBe('function')
})
test('Fill Form to create a company', async () => {
  const investorData = {
    fullName: 'Naguib sawiris',
    birthdate: '1950-02-18',
    email: 'sawiris@gmail.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']
  const companyData = {
    name: 'UBER',
    type: 'SPC',
    form: {
      data: ['organisingLaw',
        'legalForm',
        'establishmentName',
        'englishEstablishmentName',
        'headOfficeGovernorate',
        'headOfficeCity',
        'phone',
        1555,
        'investorName',
        'investorNationalId',
        '1980-05-15']
    }
  }
  const createdCompany = await investor.fillForm(companyData, investorId)
  const myCompany = createdCompany.data.data
  const companyId = myCompany['_id']
  const equalData = {
    name: 'UBER',
    type: 'SPC',
    form: {
      data: ['organisingLaw',
        'legalForm',
        'establishmentName',
        'englishEstablishmentName',
        'headOfficeGovernorate',
        'headOfficeCity',
        'phone',
        1555,
        'investorName',
        'investorNationalId',
        '1980-05-15'],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      accepted: false,
      paid: false,
      state: 'pending'
    },
    id: companyId,
    investorId: investorId,
    __v: '0'
  }
  expect.assertions(1)
  expect(myCompany).toEqual(equalData)
})

test('TrackApplication exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.trackApplication)).toBe('function')
})

test('Track Applications', async () => {
  const data = {
    fullName: 'Sir Abraham Smith',
    birthdate: '1638-04-27',
    email: 'sir@smith.com'
  }
  const created = await investor.createInvestor(data)
  const id = created.data.data._id
  var createdCompanies = []
  const min = 0
  const max = 10
  var bound = Math.floor(Math.random() * (+max - +min)) + +min
  for (var i = 0; i < bound; i++) {
    const companyData = {
      name: randomString(6),
      type: randomBoolean() ? 'SPC' : 'SSC',
      accepted: randomBoolean(),
      investorId: id,
      form: {
        filledByLawyer: randomBoolean(),
        paid: randomBoolean()
      }
    }
    company.createCompany(companyData)
    createdCompanies.push(companyData)
  }

  const retrieved = await investor.trackApplication(id)
  const retrievedCompanies = retrieved.data.companies
  // expect.assertions(bound)

  for (var j = 0; j < bound; j++) {
    const createdCompany = createdCompanies[j]
    const retrievedCompany = retrievedCompanies[j]
    partialJSONEquality(createdCompany, retrievedCompany)
  }
})

const randomBoolean = () => {
  return Math.random() >= 0.5
}

const randomString = length => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  var result = ''
  for (var i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const partialJSONEquality = (partialJSON, completeJSON) => {
  Object.keys(partialJSON).forEach(key => {
    if (isObject(partialJSON[key])) {
      partialJSONEquality(partialJSON[key], completeJSON[key])
    } else {
      expect(partialJSON[key]).toEqual(completeJSON[key])
    }
  })
}

const isObject = value => {
  return value && typeof value === 'object' && value.constructor === Object
}
