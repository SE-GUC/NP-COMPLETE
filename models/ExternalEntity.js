const uuid = require('uuid')

class ExternalEntity {
    constructor(name,phone,email) {
        this.id = uuid.v4();
        this.name = name;
        this.phone = phone;
        this.email = email;
        
    };
}

module.exports = ExternalEntity;
