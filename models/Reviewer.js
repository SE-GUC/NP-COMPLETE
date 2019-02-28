const uuidv4 = require('uuid/v4')

class Reviewer {
  constructor (fullName, birthdate, email, startDate, workingHours, salary) {
    this.id = uuidv4()
    this.fullName = fullName
    this.birthdate = birthdate
    this.age = Date.now - birthdate
    this.email = email
    this.startDate = startDate
    this.workingHours = workingHours
    this.salary = salary
  }
}

module.exports = Reviewer
