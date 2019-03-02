const uuidv4 = require('uuid/v4')

class Investor {
  constructor (fullName, birthdate, age, email) {
    this.fullName = fullName
    this.birthdate = birthdate
    this.age = this.age = (new Date()).getFullYear() - (new Date(birthdate)).getFullYear()
    this.email = email
    this.id = uuidv4()
  };
}

module.exports = Investor
