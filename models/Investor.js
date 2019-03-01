const uuidv4 = require('uuid/v4');

class Investor {
    constructor(fullName, birthDate, age, email) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.age = this.age = (new Date()).getFullYear() - (new Date(birthDate)).getFullYear();
        this.email = email;
        this.id = uuidv4();
        
    };
}

module.exports = Investor

