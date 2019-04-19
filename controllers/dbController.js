// Needed modules
const bcrypt = require('bcryptjs')

// Entities models
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Reviewer = require('../models/Reviewer')
const Investor = require('../models/Investor')
const ExternalEntity = require('../models/ExternalEntity')
const CompanyType = require('../models/CompanyType')
const Task = require('../models/Task')

exports.DBRepop = async res => {
  try {
  // Clear all
    const models = [Admin, Lawyer, Company, Reviewer, Investor, ExternalEntity, CompanyType, Task]
    models.forEach(async model => {
      await model.deleteMany({})
    })

    // Adding samples
    try {
      await sampleAdmins()
      await sampleReviewers()
      await sampleLawyers()
      await sampleInvestors()
      await sampleExternalEntities()
      await sampleCompanyTypes()
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.message
      })
    }

    res.json({
      status: 'Success',
      message: 'The database has been cleared and repopulated'
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  }
}

const sampleAdmins = async () => {
  const admins = [
    {
      fullName: 'Andrew Alex',
      birthdate: '1990-01-01T00:00:00.000+00:00',
      email: 'andrew@alex.com',
      password: 'passwordstrong',
      startDate: '2012-02-03T00:00:00.000+00:00',
      workingHours: 8
    }
  ]

  admins.forEach(async admin => {
    const salt = bcrypt.genSaltSync(10)
    admin.password = bcrypt.hashSync(admin.password, salt)
    await Admin.create(admin)
  })
}

const sampleReviewers = async () => {
  const reviewers = [
    {
      fullName: 'Robert Remon',
      birthdate: '1993-02-01T00:00:00.000+00:00',
      email: 'robert@remon.com',
      password: 'strong1234',
      startDate: '2013-01-03T00:00:00.000+00:00',
      workingHours: 5
    },
    {
      fullName: 'Rama Richard',
      birthdate: '1996-06-06T00:00:00.000+00:00',
      email: 'rama@richard.com',
      password: 'hardtobreak',
      startDate: '2017-07-07T00:00:00.000+00:00',
      salary: 1000
    }
  ]

  reviewers.forEach(async reviewer => {
    const salt = bcrypt.genSaltSync(10)
    reviewer.password = bcrypt.hashSync(reviewer.password, salt)
    await Reviewer.create(reviewer)
  })
}

const sampleLawyers = async () => {
  const lawyers = [
    {
      fullName: 'Liam Lee',
      birthdate: '1999-01-03T00:00:00.000+00:00',
      email: 'liam@lee.com',
      password: 'sunlight',
      startDate: '2015-02-05T00:00:00.000+00:00'
    },
    {
      fullName: 'Leo Lukas',
      birthdate: '1997-05-02T00:00:00.000+00:00',
      email: 'leo@lukas.com',
      password: 'goodpassword',
      startDate: '2017-04-15T00:00:00.000+00:00'
    },
    {
      fullName: 'Lila Leonard',
      birthdate: '1995-01-06T00:00:00.000+00:00',
      email: 'lila@leonard.com',
      password: 'verystrongpassword',
      startDate: '2014-03-03T00:00:00.000+00:00',
      workingHours: 7,
      salary: 3000
    },
    {
      fullName: 'Laura Louis',
      birthdate: '1998-08-08T00:00:00.000+00:00',
      email: 'laura@louis.com',
      password: 'mystrongword',
      startDate: '2018-05-02T00:00:00.000+00:00',
      workingHours: 9,
      salary: 5000
    }
  ]

  lawyers.forEach(async lawyer => {
    const salt = bcrypt.genSaltSync(10)
    lawyer.password = bcrypt.hashSync(lawyer.password, salt)
    await Lawyer.create(lawyer)
  })
}

const sampleInvestors = async () => {
  const investors = [
    {
      fullName: 'Bill Gates',
      birthdate: '1955-10-28T00:00:00.000+00:00',
      email: 'bill@gates.com',
      password: 'richguy'
    },
    {
      fullName: 'Warren Buffett',
      birthdate: '1930-08-30T00:00:00.000+00:00',
      email: 'warren@buffett.com',
      password: 'stocksguy'
    },
    {
      fullName: 'Jeff Bezos',
      birthdate: '1964-12-01T00:00:00.000+00:00',
      email: 'jeff@bezos.com',
      password: 'amazonguy'
    },
    {
      fullName: 'Mark Zuckerberg',
      birthdate: '1984-05-14T00:00:00.000+00:00',
      email: 'mark@zuckerberg.com',
      password: 'facebookguy'
    },
    {
      fullName: 'Elon Musk',
      birthdate: '1971-06-28T00:00:00.000+00:00',
      email: 'elon@musk.com',
      password: 'rocketman'
    }
  ]

  investors.forEach(async investor => {
    const salt = bcrypt.genSaltSync(10)
    investor.password = bcrypt.hashSync(investor.password, salt)
    await Investor.create(investor)
  })
}

const sampleExternalEntities = async () => {
  const externalEntities = [
    {
      name: 'GAFI',
      email: 'info@gafinet.org​​​',
      password: 'investhere',
      phone: 16035,
      feesPercentage: 0.001,
      feesMin: 100,
      feesMax: 1000,
      url: 'gafi.gov.eg'
    },
    {
      name: 'Notary Public',
      email: 're.documentation@jp.gov.eg',
      password: 'notehere',
      phone: 225751058,
      feesPercentage: 0.0025,
      feesMin: 10,
      feesMax: 1000,
      url: 'rern.gov.eg'
    },
    {
      name: 'Commercial Register',
      email: 'info@Itda.gov.eg',
      password: 'registerhere',
      phone: 20222715040,
      feesPercentage: 0,
      feesMin: 56,
      feesMax: 56,
      url: 'itda.gov.eg'
    }
  ]

  externalEntities.forEach(async externalentity => {
    const salt = bcrypt.genSaltSync(10)
    externalentity.password = bcrypt.hashSync(externalentity.password, salt)
    await ExternalEntity.create(externalentity)
  })
}

const sampleCompanyTypes = async () => {
  // console.log(CompanyType.countDocuments())
  const fieldsSSC = [
    // Legal info
    'Organizing law',
    'Company\'s legal Form',

    // Company Name(s)
    'Company Name',
    'English Company Name',

    // Headquarters info
    'Governorate',
    'City',
    'Address',
    'Telephone Number',
    'Fax',

    // Financial data
    'capital currency',
    'capital',

    // Investor info
    'Name',
    'Type',
    'Gender',
    'Nationality',
    'identification type',
    'identification number',
    'birthdate',
    'address',
    'telephone number',
    'fax',
    'email',

    // TODO: should allow multiple managers

    // Manager info
    'Manager name',
    'Manager type',
    'Manager gender',
    'Manager nationality',
    'Manager identification type',
    'Manager identification number',
    'Manager birthdate',
    'Manager address',
    'Manager role in board of directors'
  ]

  const fieldsSPC = [
    // Legal info
    'Organizing law',
    'Company\'s legal Form',

    // Company Name(s)
    'Company Name',
    'English Company Name',

    // Headquarters info
    'Governorate',
    'City',
    'Address',
    'Telephone Number',
    'Fax',

    // Financial data
    'capital currency',
    'capital',

    // Investor info
    'Name',
    'Type',
    'Gender',
    'Nationality',
    'identification type',
    'identification number',
    'birthdate',
    'address',
    'telephone number',
    'fax',
    'email'
  ]

  const companyTypes = [
    {
      companyType: 'SSC',
      fields: fieldsSSC,
      types: fullArray('string', fieldsSSC.length),
      // TODO: should add required() and other document validations
      // TODO: should run validations
      validations: fullArray('string()', fieldsSSC.length),
      // TODO: should add actual descriptions
      descriptions: fullArray('form field', fieldsSSC.length)
    },
    {
      companyType: 'SPC',
      fields: fieldsSPC,
      types: fullArray('string', fieldsSPC.length),
      // TODO: should add same as above
      validations: fullArray('string()', fieldsSPC.length),
      descriptions: fullArray('form field', fieldsSPC.length)
    }
  ]

  companyTypes.forEach(async companyType => {
    await CompanyType.create(companyType)
  })
}

const fullArray = (element, length) => {
  var result = []
  for (var i = 0; i < length; i++) {
    result.push(element)
  }
  return result
}

exports.RepopCompanies = async res => {
  const investors = await Investor.find()
  const lawyers = await Lawyer.find()
  const reviewers = await Reviewer.find()

  const companies = [
    {
      name: 'Microsoft',
      establishmentDate: '1975-04-04',
      type: 'SSC',
      state: 'Established',
      accepted: true,
      investorId: investors[0]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SSC recognized company',

          // Company Name(s)
          'Microsoft',
          'Microsoft Co.',

          // Headquarters info
          'New Mexico',
          'Albuquerque',
          '15 Waterway',
          '55889634',
          '55889633',

          // Financial data
          'dollars',
          '753000000000',

          // Investor info
          'Bill Gates',
          'Person',
          'Male',
          'America',
          'Passport',
          'A12338900',
          '1955-10-28',
          '15 Summerside Street, New York',
          '8900639912',
          '8900639913',
          'bill@gates.com',

          // Manager info
          'Paul Allen',
          'Person',
          'Male',
          'America',
          'Passport',
          'S1209634',
          '1953-01-21',
          '10 Broadway, Chicago',
          'Chairman'
        ],
        acceptedByLawyer: 1,
        acceptedByReviewer: 1,
        filledByLawyer: false,
        paid: true,
        lawyerID: lawyers[0]._id,
        reviewerID: reviewers[0]._id
      },
      fees: 0
    },
    {
      name: 'Facebook',
      establishmentDate: '2004-02-04',
      type: 'SPC',
      state: 'Established',
      accepted: true,
      investorId: investors[3]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SPC recognized company',

          // Company Name(s)
          'Facebook',
          'Facebook Inc.',

          // Headquarters info
          'Massachusetts',
          'Cambridge',
          '1 Hacker way',
          '55630011',
          '55630012',

          // Financial data
          'dollars',
          '97334000000',

          // Investor info
          'Mark Zuckerberg',
          'Person',
          'Male',
          'America',
          'Passport',
          'A15893270',
          '1984-05-14',
          '101 Palo Alto, California',
          '8900787556',
          '8900787557',
          'mark@zuckerberg.com'
        ],
        acceptedByLawyer: 1,
        acceptedByReviewer: 1,
        filledByLawyer: false,
        paid: true,
        lawyerID: lawyers[1]._id,
        reviewerID: reviewers[1]._id
      },
      fees: 0
    },
    {
      name: 'Molto',
      type: 'SSC',
      state: 'Pending',
      investorId: investors[4]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SSC recognized company',

          // Company Name(s)
          'Molto',
          'Molto Corp',

          // Headquarters info
          'Alexandria',
          'Alexandria',
          '15 Talaat Harb Street',
          '2035610943',
          '2035610944',

          // Financial data
          'Egyptian pounds',
          '10000000',

          // Investor info
          'Elon Musk',
          'Person',
          'Male',
          'Canada',
          'Passport',
          'C06733970',
          '1971-06-28',
          '4 Winter Street, New Cairo',
          '200837937',
          '200837938',
          'elon@musk.com',

          // Manager info
          'Ahmed Gaber',
          'Person',
          'Male',
          'Egypt',
          'National ID',
          '27006071782946',
          '1970-06-07',
          '10 Thawra Street, Heliopolis',
          'CFO'
        ]
      }
    },
    {
      name: 'Lava',
      type: 'SPC',
      state: 'Pending',
      accepted: false,
      investorId: investors[1]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SPC recognized company',

          // Company Name(s)
          'لافا',
          'Lava',

          // Headquarters info
          'Gizah',
          'Giza',
          '13 Saad Street',
          '22996347',
          '22996348',

          // Financial data
          'Egyptian pounds',
          '1000000',

          // Investor info
          'Warren Buffett',
          'Person',
          'Male',
          'America',
          'Passport',
          'A17773270',
          '1930-08-30',
          'Kilo 56, Sokhna Road',
          '01226934567', // This is a random number, please don't call
          '01226934568',
          'warren@buffett.com'
        ],
        acceptedByLawyer: 0,
        lawyerID: lawyers[3]._id
      },
      fees: 0
    },
    {
      name: 'Koko',
      type: 'SPC',
      state: 'Pending',
      accepted: false,
      investorId: investors[2]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SPC recognized company',

          // Company Name(s)
          'كوكو',
          'Koko',

          // Headquarters info
          'Dakahlia',
          'Mansoura',
          '66 Mohafza Street',
          '5069318',
          '5069319',

          // Financial data
          'Egyptian pounds',
          '4000000',

          // Investor info
          'Jeff Bezos',
          'Person',
          'Male',
          'America',
          'Passport',
          'T2369877',
          '1964-12-01',
          'Mashaya 99, Corniche Road',
          '01550930997',
          '01550930998',
          'jeff@bezos.com'
        ],
        acceptedByLawyer: 1,
        lawyerID: lawyers[3]._id
      }
    },
    {
      name: 'Bottler',
      type: 'SSC',
      state: 'Pending',
      accepted: false,
      investorId: investors[0]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SSC recognized company',

          // Company Name(s)
          'Bottler',
          'Bottler Comp.',

          // Headquarters info
          'Suez',
          'Suez city',
          '15 Nasser Street',
          '6299932',
          '6299933',

          // Financial data
          'euros',
          '75000',

          // Investor info
          'Bill Gates',
          'Person',
          'Male',
          'America',
          'Passport',
          'A12338900',
          '1955-10-28',
          '15 Summerside Street, New York',
          '8900639912',
          '8900639913',
          'bill@gates.com',

          // Manager info
          'Mostafa Shawky',
          'Person',
          'Male',
          'Egypt',
          'National ID',
          '29505056319546',
          '1995-05-05',
          '10 Salah Salem, Cairo',
          'CEO'
        ],
        filledByLawyer: true,
        lawyerID: lawyers[2]._id
      }
    },
    {
      name: 'Obven',
      type: 'SSC',
      state: 'Pending',
      investorId: investors[0]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SSC recognized company',

          // Company Name(s)
          'Obven',
          'Obven Inc.',

          // Headquarters info
          'Cairo',
          'New Capital',
          '7 Light Street',
          '229635148',
          '229635149',

          // Financial data
          'euros',
          '500000',

          // Investor info
          'Bill Gates',
          'Person',
          'Male',
          'America',
          'Passport',
          'A12338900',
          '1955-10-28',
          '15 Summerside Street, New York',
          '8900639912',
          '8900639913',
          'bill@gates.com',

          // Manager info
          'Nour Waleed',
          'Person',
          'Female',
          'Egypt',
          'National ID',
          '29907056329756',
          '1999-07-05',
          '11 Salem Street, Cairo',
          'COO'
        ],
        filledByLawyer: true,
        lawyerID: lawyers[2]._id,
        acceptedByLawyer: 1
      }
    },
    {
      name: 'Tina',
      type: 'SPC',
      state: 'Pending',
      investorId: investors[2]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SPC recognized company',

          // Company Name(s)
          'Tina',
          'Tina Look',

          // Headquarters info
          'Cairo',
          'Cairo',
          '66 Shobra Street',
          '225069318',
          '225069319',

          // Financial data
          'Egyptian pounds',
          '8000000',

          // Investor info
          'Jeff Bezos',
          'Person',
          'Male',
          'America',
          'Passport',
          'T2369877',
          '1964-12-01',
          '1256 Upper Cairo, Corniche Road',
          '01550930997',
          '01550930998',
          'jeff@bezos.com'
        ],
        acceptedByLawyer: 1,
        lawyerID: lawyers[2]._id,
        acceptedByReviewer: 0,
        filledByLawyer: false,
        paid: false,
        reviewerID: reviewers[1]._id
      }
    },
    {
      name: 'Martholia',
      type: 'SPC',
      state: 'Pending',
      investorId: investors[2]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SPC recognized company',

          // Company Name(s)
          'Martholia',
          'Martholia LLC',

          // Headquarters info
          'South Luxour',
          'Luxour',
          '66 Pharaoh Street',
          '9725631',
          '9725632',

          // Financial data
          'Egyptian pounds',
          '800000',

          // Investor info
          'Jeff Bezos',
          'Person',
          'Male',
          'America',
          'Passport',
          'T2369877',
          '1964-12-01',
          '12th statue left, Karnak temple',
          '01550930997',
          '01550930998',
          'jeff@bezos.com'
        ],
        acceptedByLawyer: 1,
        lawyerID: lawyers[3]._id,
        acceptedByReviewer: 1,
        filledByLawyer: true,
        paid: false,
        reviewerID: reviewers[1]._id
      }
    },
    {
      name: 'Universal',
      type: 'SSC',
      state: 'Pending',
      accepted: false,
      investorId: investors[3]._id,
      form: {
        data: [
          // Legal info
          'Law 159',
          'SSC recognized company',

          // Company Name(s)
          'Universal',
          'Universal Inc.',

          // Headquarters info
          'Assuit',
          'Assuit',
          'Street 9',
          '88889634',
          '88889633',

          // Financial data
          'dollars',
          '70000',

          // Investor info
          'Mark Zuckerberg',
          'Person',
          'Male',
          'America',
          'Passport',
          'A15893270',
          '1984-05-14',
          '7 Summer Street',
          '01041753259',
          '01041753260',
          'mark@zuckerberg.com',

          // Manager info
          'Kareem Shamy',
          'Person',
          'Male',
          'Egypt',
          'National ID',
          '28008046341852',
          '1980-08-04',
          '4 Tantawy Street',
          'Chairman'
        ],
        acceptedByLawyer: 1,
        acceptedByReviewer: 1,
        filledByLawyer: false,
        paid: false,
        lawyerID: lawyers[0]._id,
        reviewerID: reviewers[0]._id
      },
      fees: 10000
    }
  ]

  companies.forEach(async company => {
    await Company.create(company)
  })

  res.json({
    status: 'Success',
    message: 'Companies created'
  })
}
