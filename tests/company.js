const axios = require('axios')
const company = {
  default: async () => {
    return axios.get('/api/companies/')
  },
  createCompany: async (data) => {
    return axios.post(`/api/companies/`, data)
  },
  readCompany: async (id) => {
    return axios.get(`/api/companies/${id}`)
  },
  updateCompany: async (id, data) => {
    return axios.put(`/api/companies/${id}`, data)
  },
  deleteCompany: async (id) => {
    return axios.delete(`/api/companies/${id}`)
  }
}
module.exports = company
