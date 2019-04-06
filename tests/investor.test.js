const investor = require('./investor')
const company = require('./company')
const companyType = require('./companyType')
const lawyer = require('./lawyer')
const reviewer = require('./reviewer')

test('Read-all-Investors exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.default)).toBe('function')
})
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
  await investor.deleteInvestor(id)
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
    birthdate: '1996-12-20T00:00:00.000Z',
    email: 'hey@everyone.com'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData._id
  expect.assertions(1)
  expect(createdData).toMatchObject(data)
  await investor.deleteInvestor(id)
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
  await investor.deleteInvestor(id)
})

// as an investor i should be able to pay my fees
test('edit-form-by-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.editForm)).toBe('function')
})

test('edit a form by an Investor', async () => {
  const companyTypeTest = {
    companyType: 'BBC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createdCompanyTypeData = createdCompanyType.data.data
  const companyTypeId = createdCompanyTypeData._id
  const data = {
    data: [ 'cairo', false, 2255 ]
  }
  const investorTest = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    investorId: investorId,
    name: 'test',
    type: 'BBC',
    accepted: false
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  const updatedForm = await investor.editForm(data, companyId)
  const UpdatedFormData = updatedForm.data.updatedCompany.form.data
  expect.assertions(1)
  expect(UpdatedFormData).toEqual(data.data)
  await companyType.deleteCompanyType(companyTypeId)
  await investor.deleteInvestor(investorId)
  await company.deleteCompany(companyId)
})

// As an investor I should be able to show a list for my peniding and established companies.
test('Get Companies Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.getCompanies)).toBe('function')
})

test('Get my companies', async () => {
  const companyTypeTest1 = {
    companyType: 'SSC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType1 = await companyType.createCompanyType(companyTypeTest1)
  const createdCompanyTypeData1 = createdCompanyType1.data.data
  const companyTypeId1 = createdCompanyTypeData1._id
  const companyTypeTest2 = {
    companyType: 'SPC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType2 = await companyType.createCompanyType(companyTypeTest2)
  const createdCompanyTypeData2 = createdCompanyType2.data.data
  const companyTypeId2 = createdCompanyTypeData2._id

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
  const firstCompanyId = firstCompany._id
  const company2 = await company.createCompany(companyData2)
  const secondCompany = company2.data.data
  const secondcCompanyId = secondCompany._id
  const expected = await investor.getCompanies(investorId)
  const expectedData = expected.data.data
  const myCompanies = [firstCompany, secondCompany]
  expect.assertions(1)
  expect(expectedData).toEqual(myCompanies)
  await companyType.deleteCompanyType(companyTypeId1)
  await companyType.deleteCompanyType(companyTypeId2)
  await investor.deleteInvestor(investorId)
  await company.deleteCompany(firstCompanyId)
  await company.deleteCompany(secondcCompanyId)
})
// As an investor I should be able to fill an application form, so that I can establish a company.
test('Fill Form Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.fillForm)).toBe('function')
})

test('Fill Form to create a company', async () => {
  const companyTypeTest = {
    companyType: 'WWC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createdCompanyTypeData = createdCompanyType.data.data
  const companyTypeId = createdCompanyTypeData._id
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
    type: 'WWC',
    form: {
      data: ['organisingLaw',
        false,
        15]
    }
  }
  const createdCompany = await investor.fillForm(companyData, investorId)
  const myCompany = createdCompany.data.data
  const companyId = myCompany['_id']
  const equalData = {
    name: 'UBER',
    type: 'WWC',
    form: {
      data: ['organisingLaw',
        false,
        15],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    _id: companyId,
    investorId: investorId,
    state: 'pending',
    accepted: false
  }
  expect.assertions(1)
  expect(myCompany).toMatchObject(equalData)
  await companyType.deleteCompanyType(companyTypeId)
  await investor.deleteInvestor(investorId)
  await company.deleteCompany(companyId)
}, 5500)

test('TrackApplication exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.trackApplication)).toBe('function')
})

test('Track Applications', async () => {
  const companyTypeTest = {
    companyType: 'SSC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createdCompanyTypeData = createdCompanyType.data.data
  const companyTypeId = createdCompanyTypeData._id
  const data = {
    fullName: 'Sir Abraham Smith',
    birthdate: '1638-04-27',
    email: 'sir@smith.com'
  }
  const created = await investor.createInvestor(data)
  const investorId = created.data.data._id

  const company1 = {
    name: 'Corp Co',
    type: 'SSC',
    investorId: investorId,
    form: {
    }
  }

  const createdCompany1 = await company.createCompany(company1)
  const constCompnaydata1 = createdCompany1.data.data
  const companyId1 = constCompnaydata1._id

  const company2 = {
    name: 'Robb Co',
    type: 'SSC',
    investorId: investorId,
    form: {
    }
  }

  const createdCompany2 = await company.createCompany(company2)
  const constCompnaydata2 = createdCompany2.data.data
  const companyId2 = constCompnaydata2._id

  const createdCompanies = [company1, company2]
  const retrieved = await investor.trackApplication(investorId)
  const retrievedCompanies = retrieved.data.companies
  expect.assertions(2)

  for (var j = 0; j < 2; j++) {
    const createdCompany = createdCompanies[j]
    const retrievedCompany = retrievedCompanies[j]
    expect(retrievedCompany).toMatchObject(createdCompany)
  }
  await companyType.deleteCompanyType(companyTypeId)
  await investor.deleteInvestor(investorId)
  await company.deleteCompany(companyId1)
  await company.deleteCompany(companyId2)
}, 10000)

// user story 1.04 part 1
test('viewRejected-form-by-Lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.viewRejected)).toBe('function')
})

// user story 1.04 part 2

test('viewRejected form by an Investor ', async () => {
  const companyTypeTest = {
    companyType: 'SSC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createdCompanyTypeData = createdCompanyType.data.data
  const companyTypeId = createdCompanyTypeData._id
  const investorData = {
    fullName: 'Anothony Martial',
    birthdate: '1996-12-20',
    email: 'hey@everyone.com'
  }
  const lawyerData = {
    fullName: 'test',
    birthdate: '1996-12-20',
    email: 'hey@everyone.com',
    startDate: '1996-12-20'
  }
  const reviewerData = {
    fullName: 'test',
    birthdate: '1996-12-20',
    email: 'hey@everyone.com',
    startDate: '1996-12-20'
  }
  const reviewerCreated = await reviewer.createReviewer(reviewerData)
  const reviewerCreatedData = reviewerCreated.data.data
  const reviewerId = reviewerCreatedData['_id']

  const lawyerCreated = await lawyer.createLawyer(lawyerData)
  const createdLawyerData = lawyerCreated.data.data
  const lawyerId = createdLawyerData['_id']

  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']

  const companyData = {
    name: 'Nike',
    establishmentDate: '1837-02-15',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 0,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    }
  }
  const companyData1 = {
    name: 'Nike',
    establishmentDate: '1837-02-15',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 0,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    }
  }
  const createdCompanyForm = companyData['form']
  const createdCompanyForm1 = companyData1['form']

  const cc = await company.createCompany(companyData)
  const ccId = cc.data.data['_id']
  const cc1 = await company.createCompany(companyData1)
  const cc1Id = cc1.data.data['_id']

  const rejectedCompany = await investor.viewRejected(investorId)
  const rejectedCompanyForm = rejectedCompany.data.data[0]
  const rejectedCompanyForm1 = rejectedCompany.data.data[1]

  expect.assertions(1)
  expect(rejectedCompanyForm).toMatchObject(createdCompanyForm) && expect(rejectedCompanyForm1).toMatchObject(createdCompanyForm1)
  await companyType.deleteCompanyType(companyTypeId)
  await lawyer.deleteLawyer(lawyerId)
  await company.deleteCompany(ccId)
  await company.deleteCompany(cc1Id)
  await investor.deleteInvestor(investorId)
  await reviewer.deleteReviewer(reviewerId)
})

// as an investor i should be able to pay fees
test('payFees-by-Investor exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.payFees)).toBe('function')
})

test('pay a fees by an Investor', async () => {
  const companyTypeTest = {
    companyType: 'SSC',
    fields: ['stringField', 'booleanField', 'NumberFeild'],
    types: ['string', 'boolean', 'number'],
    validations: ['.required().string()', '.boolean()', '.required().integer()'],
    descriptions: ['df', 'dv', 'dv']
  }
  await companyType.createCompanyType(companyTypeTest)
  const investorTest = {
    fullName: 'jon snow',
    birthdate: '2001-10-02',
    email: 'kingInTheNorth@nightswatch.got'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', true, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: true,
      paid: false
      // fees: 200
    },
    investorId: id,
    name: 'Company',
    type: 'SSC',
    accepted: true
  }
  const output = {
    form: {
      data: ['cairo', true, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: true,
      paid: true,
      fees: 0
    },
    investorId: id,
    name: 'Company',
    type: 'SSC',
    accepted: true
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  try {
    const updatedCompany = await investor.fillForm(id, companyId)
    const updatedCompanyData = updatedCompany.data.data
    expect.assertions(1)
    expect(updatedCompanyData).toMatchObject(output)
  } catch (error) {

  }
})

// Test As an investor I should be able to cancel an unreviewed application, so that I can stop the process of establishing a company I don't want anymore.

// Test existance
test('Cancel-Unreviewed-Application exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.cancelUnreviewed)).toBe('function')
})

// Test functionalty
test('Cancel Unreviewed Application an Investor', async () => {
  const investorTest = {
    fullName: 'jon snow',
    birthdate: '2001-10-02',
    email: 'kingInTheNorth@nightswatch.got'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: true,
      paid: false
    },
    investorId: id,
    name: 'Company',
    type: 'SSC',
    accepted: true
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  const bodyData = {
    id: companyId
  }
  const cancelled = await investor.cancelUnreviewed(id, bodyData)
  const cancelledData = cancelled.data.deletedApplication
  expect.assertions(1)
  expect(cancelledData).toMatchObject(createdCompanyData)
})

// Test feedback existance
test('give Feedback exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.giveFeedback)).toBe('function')
})

// Test functionalty
test('give Feedback', async () => {
  const investorData = {
    fullName: 'Shiko elgamed',
    birthdate: '1998-07-20',
    email: 'shiko@gmail.com'
  }
  const investorCreated = await investor.createInvestor(investorData)
  const createdInvestorData = investorCreated.data.data
  const investorId = createdInvestorData['_id']

  const companyData = {
    name: 'Toys are Shiko',
    type: 'SSC',
    investorId: investorId,
    form: {
      data: [],
      comment: 'Very good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const review = {
    feedback: 'Website gamed awy'
  }

  const companyUpdatedData = {
    name: 'Toys are Shiko',
    type: 'SSC',
    investorId: investorId,
    form: {
      data: [],
      comment: 'Very good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    },
    feedback: 'Website gamed awy'
  }
  const companyCreated = await company.createCompany(companyData)
  const createdCompanyData = companyCreated.data.data
  const companyId = createdCompanyData['_id']

  const updated = await investor.giveFeedback(companyId, investorId, review)
  const updatedData = updated.data.data
  expect.assertions(1)
  return expect(updatedData).toMatchObject(companyUpdatedData)
})

test('Read Company Description exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.readDescription)).toBe('function')
})

test('Read Company Description', async () => {
  const companyTypeTest = {
    companyType: 'New',
    fields: [],
    types: [],
    validations: [],
    descriptions: ['Hello', 'World']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createCompanyTypeData = createdCompanyType.data.data
  const description = await investor.readDescription(companyTypeTest.companyType)
  const descriptionData = description.data.description
  expect.assertions(1)
  expect(descriptionData).toEqual(createCompanyTypeData.description)
})
