// The admin model
const uuidv4 = require('uuid/v4')

class Admin {
  constructor (fullName, email, birthdate, startDate, workingHours, salary) {
    this.id = uuidv4()
    this.fullName = fullName
    this.email = email
    this.birthdate = birthdate
    this.age = (new Date()).getFullYear() - (new Date(birthdate)).getFullYear()
    this.startDate = startDate
    this.workingHours = workingHours
    this.salary = salary
  }
}

module.exports = Admin
