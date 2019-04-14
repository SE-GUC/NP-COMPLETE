const axios = require('axios')
const lawyer = {
  default: async () => {
    return axios.get('/api/lawyers/')
  },
  createLawyer: async (data) => {
    return axios.post(`/api/lawyers/`, data)
  },
  readLawyer: async (id) => {
    return axios.get(`/api/lawyers/${id}`)
  },
  updateLawyer: async (id, data) => {
    return axios.put(`/api/lawyers/${id}`, data)
  },
  deleteLawyer: async (id) => {
    return axios.delete(`/api/lawyers/${id}`)
  },
  FillForm: async (data) => {
    return axios.post(`/api/lawyers/newForm`, data)
  },
  addComment: async (lawyerId, companyId, data) => {
    return axios.put(`/api/lawyers/addComment/${lawyerId}/${companyId}`, data)
  },
  viewForm: async (id) => {
    return axios.get(`/api/lawyers/viewForm/${id}`)
  },
  editForm: async (lawyerId, companyId, data) => {
    return axios.put(`/api/lawyers/editForm/${lawyerId}/${companyId}`, data)
  },
  updateMyProfile: async (id, data) => {
    return axios.put(`/api/lawyers/updateMyProfile/${id}`, data)
  },
  decideAForm: async (lawyerId, companyId, data) => {
    return axios.put(`/api/lawyers/review/${lawyerId}/${companyId}`, data)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`/api/lawyers/viewDepartmentTask/${id}`)
  },
  casesPage: async (id) => {
    return axios.get(`/api/lawyers/casesPage/${id}`)
  },
  workPage: async (id) => {
    return axios.get(`/api/lawyers/workPage/${id}`)
  },
  calculateFees: async (id) => {
    return axios.get(`/api/lawyers/calculateFees/${id}`)
  }
}
module.exports = lawyer
