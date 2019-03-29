const axios = require('axios')
const investor = {
  createInvestor: async (data) => {
    return axios.post(`http://localhost:8000/api/investors/`, data)
  }
}
module.exports = investor
