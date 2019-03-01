const uuidv4 = require('uuid/v4')

class ExternalEntity {
  constructor (fullName, email, phone) {
    this.id = uuidv4()
    this.fullName = fullName
    this.email = email
    this.phone = phone
  }
}
module.exports = ExternalEntity
