const investor = require('./investor')
const company = require('./company')
const companyType = require('./companyType')
const lawyer = require('./lawyer')
const reviewer = require('./reviewer')

jest.setTimeout(10000)

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
})

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
  const deletedData = deleted.data.deleted
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
    companyType: 'type5',
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
    type: 'type5',
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
  const investorData = {
    fullName: 'Naguib sawiris',
    birthdate: '1950-05-15',
    email: 'sawiris@gmail.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']
  const companyData1 = {
    name: 'Nike',
    establishmentDate: '1837-08-20',
    type: 'SSC',
    state: 'Pending',
    investorId: id,
    form: {
      data: [],
      comment: 'bad company',
      acceptedByLawyer: 0,
      acceptedByReviewer: -1,
      filledByLawyer: false
    }
  }
  const companyData2 = {
    name: 'puma',
    establishmentDate: '1820-05-15',
    type: 'SPC',
    state: 'Established',
    investorId: id,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false
    }
  }
  const company1 = await company.createCompany(companyData1)
  const firstCompany = company1.data.data
  const firstCompanyId = firstCompany._id
  const company2 = await company.createCompany(companyData2)
  const secondCompany = company2.data.data
  const secondcCompanyId = secondCompany._id
  const companies = await investor.getCompanies(id)
  const expectedData = companies.data.data
  const myCompanies = [firstCompany, secondCompany]
  expect.assertions(1)
  expect(expectedData).toMatchObject(myCompanies)
  await investor.deleteInvestor(id)
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
    state: 'Pending',
    accepted: false
  }
  expect.assertions(1)
  expect(myCompany).toMatchObject(equalData)
  await companyType.deleteCompanyType(companyTypeId)
  await investor.deleteInvestor(investorId)
  await company.deleteCompany(companyId)
})

// user story 1.04 part 1
test('viewRejected-form-by-Lawyer exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.viewRejected)).toBe('function')
})

// user story 1.04 part 2

test('viewRejected form by an Investor ', async () => {
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
  const companyTypeData = {
    companyType: 'FCB',
    fields: ['name', 'fax'],
    types: ['string', 'number'],
    validations: ['.string', '.number'],
    descriptions: ['dp', 'dp']
  }
  const companyTypeCreated = await companyType.createCompanyType(companyTypeData)
  const companyTypeCreatedData = companyTypeCreated.data.data
  const companyTypeId = companyTypeCreatedData._id
  const companyData = {
    name: 'ABOLOS',
    type: 'FCB',
    state: 'Pending',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 0,
      filledByLawyer: false,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    }
  }
  const companyData1 = {
    name: 'WINGS',
    type: 'FCB',
    state: 'Pending',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      acceptedByLawyer: 0,
      filledByLawyer: false,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    }
  }
  const cc = await company.createCompany(companyData)
  const ccId = cc.data.data['_id']
  const cc1 = await company.createCompany(companyData1)
  const cc1Id = cc1.data.data['_id']
  const rejectedCompany = await investor.viewRejected(investorId)
  const rejectedCompanyData = rejectedCompany.data.data
  const comparedData = [{
    name: 'ABOLOS',
    type: 'FCB',
    state: 'Pending',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 0,
      filledByLawyer: false,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    },
    descriptions: ['dp', 'dp'],
    fields: ['name', 'fax']
  }, {
    name: 'WINGS',
    type: 'FCB',
    state: 'Pending',
    accepted: true,
    investorId: `${investorId}`,
    form: {
      data: [],
      acceptedByLawyer: 0,
      filledByLawyer: false,
      lawyerID: `${lawyerId}`,
      reviewerID: `${reviewerId}`
    },
    descriptions: ['dp', 'dp'],
    fields: ['name', 'fax']
  }]
  expect.hasAssertions()
  await companyType.deleteCompanyType(companyTypeId)
  expect(rejectedCompanyData).toMatchObject(comparedData)
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
  const investorTest = {
    fullName: 'jon snow',
    birthdate: '2001-10-02',
    email: 'kingInTheNorth@nightswatch.got'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', true, 5555],
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: true,
      paid: false
    },
    investorId: investorId,
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
    investorId: investorId,
    name: 'Company',
    type: 'SSC',
    accepted: true
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  try {
    const updatedCompany = await investor.fillForm(investorId, companyId)
    const updatedCompanyData = updatedCompany.data.data
    expect.assertions(1)
    expect(updatedCompanyData).toMatchObject(output)
    await investor.deleteInvestor(investorId)
    await company.deleteCompany(companyId)
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
      data: [],
      acceptedByLawyer: 1,
      acceptedByReviewer: -1,
      filledByLawyer: true,
      paid: false
    },
    investorId: id,
    name: 'Company',
    type: 'SSC'
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData._id
  const bodyData = {
    id: companyId
  }
  const cancelled = await investor.cancelUnreviewed(id, bodyData)
  const cancelledData = cancelled.data.deletedApplication
  expect.assertions(1)
  expect(cancelledData).toMatchObject(createdCompanyData)
  await investor.deleteInvestor(id)
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
  const id = createdInvestorData['_id']
  const companyData = {
    name: 'Toys are Shiko',
    type: 'SSC',
    investorId: id,
    form: {
      data: ['ABC', false, 15],
      comment: 'Very good company',
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    }
  }
  const review = {
    feedback: 'Website gamed awy'
  }

  const companyUpdatedData = {
    name: 'Toys are Shiko',
    type: 'SSC',
    investorId: id,
    form: {
      data: ['ABC', false, 15],
      comment: 'Very good company',
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    feedback: 'Website gamed awy'
  }
  const companyCreated = await company.createCompany(companyData)
  const createdCompanyData = companyCreated.data.data
  const companyId = createdCompanyData['_id']

  const updated = await investor.giveFeedback(companyId, id, review)
  const updatedData = updated.data.data
  expect.assertions(1)
  expect(updatedData).toMatchObject(companyUpdatedData)
  await investor.deleteInvestor(id)
  await company.deleteCompany(companyId)
})

test('Read Company Description exists', async () => {
  expect.assertions(1)
  expect(typeof (investor.readDescription)).toBe('function')
})

test('Read Company Description', async () => {
  const companyTypeTest = {
    companyType: 'New',
    fields: ['name', 'adress'],
    types: ['string', 'string'],
    validations: ['.required().string()', '.string()'],
    descriptions: ['Hello', 'World']
  }
  const createdCompanyType = await companyType.createCompanyType(companyTypeTest)
  const createCompanyTypeData = createdCompanyType.data.data
  const companyTypeId = createCompanyTypeData._id
  const description = await investor.readDescription(companyTypeTest.companyType)
  const descriptionData = description.data.descriptions
  expect.assertions(1)
  expect(descriptionData).toEqual(createCompanyTypeData.description)
  await companyType.deleteCompanyType(companyTypeId)
})
