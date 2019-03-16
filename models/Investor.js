// The investor model
const uuidv4 = require('uuid/v4')

class Investor {
  constructor (fullName, birthdate, email) {
    this.id = uuidv4()
    this.fullName = fullName
    this.birthdate = birthdate
    this.email = email
  }
}

module.exports = Investor
