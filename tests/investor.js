const axios = require('axios')
const investor = {
  createInvestor: async (data) => {
    return axios.post(`http://localhost:8000/api/investors/`, data)
  },
  deleteInvestor: async (id) => {
    return axios.delete(`http://localhost:8000/api/investors/${id}`)
  }
}
module.exports = investor
