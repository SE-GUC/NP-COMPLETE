const axios = require('axios')
const companyType = {
  default: async () => {
    return axios.get('http://localhost:8000/api/companyTypes/')
  },
  createCompanyType: async (data) => {
    return axios.post(`http://localhost:8000/api/companyTypes/`, data)
  },
  updateCompanyType: async (id, data) => {
    return axios.put(`http://localhost:8000/api/companyTypes/${id}`, data)
  },
  readCompanyType: async (id) => {
    return axios.get(`http://localhost:8000/api/companyTypes/${id}`)
  },
  deleteCompanyType: async (id) => {
    return axios.delete(`http://localhost:8000/api/companyTypes/${id}`)
  }
}
module.exports = companyType
