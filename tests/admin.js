const axios = require('axios')
const admin = {

  default: async () => {
    return axios.get('/api/admins/')
  },
  createAdmin: async (data) => {
    return axios.post(`/api/admins/`, data)
  },
  updateAdmin: async (id, data) => {
    return axios.put(`/api/admins/${id}`, data)
  },
  readAdmin: async (id) => {
    return axios.get(`/api/admins/${id}`)
  },
  deleteAdmin: async (id) => {
    return axios.delete(`/api/admins/${id}`)
  },
  viewCases: async (id) => {
    return axios.get(`/api/admins/viewCases/${id}`)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`/api/admins/viewDepartmentTask/${id}`)
  },
  publishCompany: async (id) => {
    return axios.put(`/api/admins/publishCompany/${id}`)
  },
  updateMyProfile: async (id) => {
    return axios.get(`/api/admins/updateMyProfile/${id}`)
  },
  assignDeadline: async (id, data) => {
    return axios.put(`/api/admins/updateDeadline/${id}`, data)
  },
  getFeedback: async (id) => {
    return axios.get(`/api/admins/getFeedback/${id}`)
  },
  workPage: async (id) => {
    return axios.get(`/api/admins/workPage/${id}`)
  }
}
module.exports = admin
