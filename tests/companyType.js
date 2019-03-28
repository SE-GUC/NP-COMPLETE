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
  }
}
module.exports = companyType
