// The task model
const uuidv4 = require('uuid/v4')

class Task {
  constructor (handler, creationDate, deadline) {
    this.id = uuidv4()
    this.handler = handler
    this.creationDate = creationDate
    this.deadline = deadline
  }
}

module.exports = Task
