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
  fillForm: async (data, id) => {
    return axios.post(`http://localhost:8000/api/investors/fillForm/${id}`, data)
  },
  trackApplication: async (id) => {
    return axios.get(`http://localhost:8000/api/investors/trackApplication/${id}`)
  },
  viewRejected: async (id) => {
    return axios.get(`http://localhost:8000/api/investors/viewRejected/${id}`)
  },
  payFees: async (id, data) => {
    return axios.get(`http://localhost:8000/api/investors/payFees/${id}`, data)
  },
  cancelUnreviewed: async (id, data) => {
    return axios.put(`http://localhost:8000/api/investors/CancelApplication/${id}`, data)
  },
  giveFeedback: async (id1, id2, data) => {
    return axios.put(`http://localhost:8000/api/investors/reviewOnlineService/${id1}/${id2}`, data)
  }
}
module.exports = investor
