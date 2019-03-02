const uuidv4 = require('uuid/v4')

class Investor {
  constructor (fullName, birthdate, email) {
    this.fullName = fullName
    this.birthdate = birthdate
    this.email = email
    this.id = uuidv4()
  };
}

module.exports = Investor
