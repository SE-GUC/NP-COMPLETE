const uuidv4 = require('uuid/v4')

class Company {
  constructor (name, type, establishmentDate, state) {
    this.id = uuidv4()
    this.name = name
    this.type = type
    this.establishmentDate = establishmentDate
    this.state = state
  };
}

module.exports = Company
