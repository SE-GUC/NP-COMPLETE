// The admin model
const uuidv4 = require('uuid/v4')

class Admin {
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

module.exports = Admin
