const axios = require('axios')
const company = {
  default: async () => {
    return axios.get('http://localhost:8000/api/companies/')
  },
  createCompany: async (data) => {
    return axios.post(`http://localhost:8000/api/companies/`, data)
  },
  readCompany: async (id) => {
    return axios.get(`http://localhost:8000/api/companies/${id}`)
  },
  updateCompany: async (id, data) => {
    return axios.put(`http://localhost:8000/api/companies/${id}`, data)
  },
  deleteCompany: async (id) => {
    return axios.delete(`http://localhost:8000/api/companies/${id}`)
}
}
module.exports = company
