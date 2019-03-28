const axios = require('axios')
const users = {
  showEstanlishedCompanies: async () => {
    return axios.get(`http://localhost:8000/api/users/showEstanlishedCompanies`)
  }
}
module.exports = users
