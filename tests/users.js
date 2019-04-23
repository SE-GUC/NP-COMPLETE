const axios = require('axios')
const users = {
  showEstablishedCompanies: async () => {
    return axios.get(`/api/users/showEstanlishedCompanies`)
  }
}
module.exports = users
