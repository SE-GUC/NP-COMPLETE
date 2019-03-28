const axios = require('axios')
const company = {
  readCompany: async (id) => {
    return axios.get(`http://localhost:8000/api/companies/${id}`)
  },
  createCompany: async (data) => {
    return axios.post(`http://localhost:8000/api/companies/`, data)
  }
}
module.exports = company
