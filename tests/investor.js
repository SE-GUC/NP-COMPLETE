const axios = require('axios')
const investor = {
  default: async () => {
    return axios.get('http://localhost:8000/api/investors/')
  },
  createInvestor: async (data) => {
    return axios.post(`http://localhost:8000/api/investors/`, data)
  },
  readInvestor: async (id) => {
    return axios.get(`http://localhost:8000/api/investors/${id}`)
  },
  deleteInvestor: async (id) => {
    return axios.delete(`http://localhost:8000/api/investors/${id}`)
  },
  updateInvestor: async (data, id) => {
    return axios.put(`http://localhost:8000/api/investors/${id}`, data)
  },
  editForm: async (data, id) => {
    return axios.put(`http://localhost:8000/api/investors/editForm/${id}`, data)
  },
  getCompanies: async (id) => {
    return axios.get(`http://localhost:8000/api/investors/getCompanies/${id}`)
  },
  trackApplication: async (id) => {
    return axios.get(`http://localhost:8000/api/investors/trackApplication/${id}`)
  }
}
module.exports = investor
