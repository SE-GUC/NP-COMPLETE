const axios = require('axios')
const company = {
  createCompany: async (data) => {
    return axios.post(`http://localhost:8000/api/companies/`, data)
  }
}
module.exports = company
