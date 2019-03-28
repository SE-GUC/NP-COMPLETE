const axios = require('axios')
const lawyer = {
  default: async () => {
    return axios.get('http://localhost:8000/api/lawyers/')
  },
  createLawyer: async (data) => {
    return axios.post(`http://localhost:8000/api/lawyers/`, data)
  },
  readLawyer: async (id) => {
    return axios.get(`http://localhost:8000/api/lawyers/${id}`)
  },
  updateLawyer: async (id, data) => {
    return axios.put(`http://localhost:8000/api/lawyers/${id}`, data)
  },
  deleteLawyer: async (id) => {
    return axios.delete(`http://localhost:8000/api/lawyers/${id}`)
  },
  FillForm: async (data) => {
    return axios.post(`http://localhost:8000/api/lawyers/newForm`, data)
  },
  addComment: async (lawyerId, companyId, data) => {
    return axios.put(`http://localhost:8000/api/lawyers/addComment/${lawyerId}/${companyId}`, data)
  },
  viewForm: async (id) => {
    return axios.post(`http://localhost:8000/api/lawyers/viewForm/${id}`)
  },
  updateMyProfile: async (id) => {
    return axios.post(`http://localhost:8000/api/lawyers/updateMyProfile/${id}`)
  },
  decideAForm: async (companyId, data) => {
    return axios.put(`http://localhost:8000/api/lawyers/review/${companyId}`, data)
  }
}
module.exports = lawyer
