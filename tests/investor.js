const axios = require('axios')
const investor = {
  default: async () => {
    return axios.get('http://localhost:8000/api/investors/')
  },
  createInvestor: async (data) => {
    return axios.post(`http://localhost:8000/api/investors/`, data)
  }
}

module.exports = investor
