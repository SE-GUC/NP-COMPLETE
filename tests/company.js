const axios = require('axios')
const company = {
  default: async () => {
    return axios.get('http://localhost:8000/api/companies/')
  },
  createCompany: async (data) => {
    return axios.post(`http://localhost:8000/api/companies/`, data)
  },
  updateCompany: async (id, data) => {
    return axios.put(`http://localhost:8000/api/companies/${id}`, data)
  }
}
module.exports = company
// Copied code from Company branch as it is needed for admin tests to run
