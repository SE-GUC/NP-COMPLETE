const axios = require('axios')
const companyType = {
  default: async () => {
    return axios.get('/api/companyTypes/')
  },
  createCompanyType: async (data) => {
    return axios.post(`/api/companyTypes/`, data)
  },
  updateCompanyType: async (id, data) => {
    return axios.put(`/api/companyTypes/${id}`, data)
  },
  readCompanyType: async (id) => {
    return axios.get(`/api/companyTypes/${id}`)
  },
  deleteCompanyType: async (id) => {
    return axios.delete(`/api/companyTypes/${id}`)
  }
}
module.exports = companyType
