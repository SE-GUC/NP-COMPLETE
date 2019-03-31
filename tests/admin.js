const axios = require('axios')
const admin = {
  deleteAll: async () => {
    return axios.delete('http://localhost:8000/api/admins/deleteAllEntries/')
  },
  default: async () => {
    return axios.get('http://localhost:8000/api/admins/')
  },
  createAdmin: async (data) => {
    return axios.post(`http://localhost:8000/api/admins/`, data)
  },
  updateAdmin: async (id, data) => {
    return axios.put(`http://localhost:8000/api/admins/${id}`, data)
  },
  readAdmin: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/${id}`)
  },
  deleteAdmin: async (id) => {
    return axios.delete(`http://localhost:8000/api/admins/${id}`)
  },
  viewCases: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/viewCases/${id}`)
  },
  viewDepartmentTasks: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/viewDepartmentTask/${id}`)
  },
  publishCompany: async (id) => {
    return axios.put(`http://localhost:8000/api/admins/publishCompany/${id}`)
  },
  updateMyProfile: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/updateMyProfile/${id}`)
  },
  assignDeadline: async (id, data) => {
    return axios.put(`http://localhost:8000/api/admins/updateDeadline/${id}`, data)
  },
  getFeedback: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/getFeedback/${id}`)
  },
  workPage: async (id) => {
    return axios.get(`http://localhost:8000/api/admins/workPage/${id}`)
  }
}
module.exports = admin
