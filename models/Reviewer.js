const uuidv4 = require('uuid/v4')

class Reviewer {
  constructor (fullName, birthdate, email, startDate, workingHours, salary) {
    this.id = uuidv4()
    this.fullName = fullName
    this.birthdate = birthdate
    this.age = Math.floor((Date.now() - birthdate.getTime()) / (1000 * 3600 * 24 * 365))
    this.email = email
    this.startDate = startDate
    this.workingHours = workingHours
    this.salary = salary
  }
}

module.exports = Reviewer
