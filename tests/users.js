const axios = require('axios')
const users = {
  showEstablishedCompanies: async () => {
    return axios.get(`http://localhost:8000/api/users/showEstanlishedCompanies`)
  }
}
module.exports = users
