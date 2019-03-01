const uuidv4 = require('uuid/v4')

class Lawyer {
  constructor (fullName, birthdate, email, startDate, workingHours, salary) {
    this.id = uuidv4()
    this.fullName = fullName
    this.birthdate = birthdate
    var convertedBirtdate = new Date(birthdate)
    this.age = calculateAge(convertedBirtdate.getMonth(), convertedBirtdate.getDate(), convertedBirtdate.getFullYear())
    this.email = email
    this.startDate = startDate
    this.workingHours = workingHours
    this.salary = salary
  };
}
function calculateAge (birthMonth, birthDay, birthYear) {
  var todayDate = new Date()
  var todayYear = todayDate.getFullYear()
  var todayMonth = todayDate.getMonth()
  var todayDay = todayDate.getDate()
  var age = todayYear - birthYear

  if (todayMonth < (birthMonth - 1)) {
    age--
  }
  if (((birthMonth - 1) === todayMonth) && (todayDay < birthDay)) {
    age--
  }
  return age
}
module.exports = Lawyer
