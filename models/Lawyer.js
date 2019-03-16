// The lawyer model
const uuidv4 = require('uuid/v4')

class Lawyer {
  constructor (fullName, birthdate, email, startDate, workingHours, salary) {
    this.id = uuidv4()
    this.fullName = fullName
    this.birthdate = birthdate
    this.email = email
    this.startDate = startDate
    this.workingHours = workingHours
    this.salary = salary
  }
}

module.exports = Lawyer
