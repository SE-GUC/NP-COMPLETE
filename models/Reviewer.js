const uuid = require('uuid');

class Reviewer
{
    constructor(name, birthdate, starting_year, working_hours, salary)
    {
        this.id = uuid.v4();
        this.name = name;
        this.birthdate = birthdate;
        this.starting_year = starting_year;
        this.working_hours = working_hours;
        this.salary = salary;
    }
}

module.exports = Reviewer;