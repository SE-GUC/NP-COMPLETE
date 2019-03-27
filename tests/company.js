const axios = require('axios')
const company = {
  default: async () => {
    return axios.get('http://localhost:8000/api/companies/')
  },
  createCompany: async (data) => {
    return axios.post(`http://localhost:8000/api/companies/`, data)
  },
  UpdateCompany: async (id) => {
    return axios.put(`http://localhost:8000/api/companies/${id}`)
  }
}
module.exports = company
