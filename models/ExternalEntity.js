const uuidv4 = require('uuid/v4')

class ExternalEntity {
  constructor (name, email, phone) {
    this.id = uuidv4()
    this.name = name
    this.email = email
    this.phone = phone
  }
}
module.exports = ExternalEntity
