const axios = require('axios')
const investor = {
  default: async () => {
    return axios.get('/api/investors/')
  },
  createInvestor: async (data) => {
    return axios.post(`/api/investors/`, data)
  },
  readInvestor: async (id) => {
    return axios.get(`/api/investors/${id}`)
  },
  deleteInvestor: async (id) => {
    return axios.delete(`/api/investors/${id}`)
  },
  updateInvestor: async (data, id) => {
    return axios.put(`/api/investors/${id}`, data)
  },
  editForm: async (data, id) => {
    return axios.put(`/api/investors/editForm/${id}`, data)
  },
  getCompanies: async (id) => {
    return axios.get(`/api/investors/getCompanies/${id}`)
  },
  fillForm: async (data, id) => {
    return axios.post(`/api/investors/fillForm/${id}`, data)
  },
  viewRejected: async (id) => {
    return axios.get(`/api/investors/viewRejected/${id}`)
  },
  payFees: async (id, data) => {
    return axios.get(`/api/investors/payFees/${id}`, data)
  },
  cancelUnreviewed: async (id, data) => {
    return axios.delete(`/api/investors/CancelApplication/${id}`, { data: data })
  },
  giveFeedback: async (id1, id2, data) => {
    return axios.put(`/api/investors/reviewOnlineService/${id1}/${id2}`, data)
  },
  readDescription: async (type) => {
    return axios.get(`/api/investors/readDescription/${type}`)
  }
}
module.exports = investor
